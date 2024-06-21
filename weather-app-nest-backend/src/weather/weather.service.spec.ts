import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from './weather.service';
import axios from 'axios';

// key line that tells jest to replace any axios calls with this fake axios
// so i can test the actual services and controllers without having to mock them
// and instead of actually calling the accuweather api i can replace those axios calls 
// with fake data
jest.mock('axios');

describe('WeatherService', () => {
  let service: WeatherService;
  let mockAxios;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherService],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
    mockAxios = axios as jest.Mocked<typeof axios>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
// actual controller/service being tested and not mocked, only axios is mocked
// which is expected for general unit tests.
  describe('getLocationKey', () => {
    it('should return the location key for a valid city', async () => {
      const city = 'New York';
      const expectedKey = '12345';
      mockAxios.get.mockResolvedValue({
        data: [{ Key: expectedKey }],
      });

      const result = await service.getLocationKey(city);
      expect(result).toEqual(expectedKey);
    });

    it('should throw an error if the city is not found', async () => {
      const city = 'FakeCity';
      // mocking axios to return blank when submitting fake data.
      mockAxios.get.mockResolvedValue({
        data: [],
      });
// this is actual error handling implemented in the real method, as opposed to the 
// completions service where i ran out of time and had to mock it so there's no 
// actual error handling on the completions service.
      await expect(service.getLocationKey(city)).rejects.toThrow(
        'Location not found',
      );
    });
  });

  describe('getCurrentWeather', () => {
    it('should return current weather data when location key is found', async () => {
      const city = 'London';
      const locationKey = '67890';
      const weatherData = [{ temperature: 15, weatherText: 'Cloudy' }];
      mockAxios.get
        .mockResolvedValueOnce({ data: [{ Key: locationKey }] }) // First call for getLocationKey because it's wired up to hit this first
        // to turn a city into its location key and then submit that downstream to the accuweather weather routes since they dont take a raw city.
        // i could have honestly removed this step, but in a prod app i'd probably keep it to illustrate to other engineers
        // that this is mirroring the real functionality even though i could've just mocked the final axios return value by itself and skipped this.
        .mockResolvedValueOnce({ data: weatherData }); // Second call for getCurrentWeather

      const result = await service.getCurrentWeather(city);
      expect(result).toEqual(weatherData);
    });
  });

  describe('getDailyForecast', () => {
    it('should return daily forecast data for the specified number of days', async () => {
      const city = 'Berlin';
      const days = 1;
      const forecastData = [
        {
          date: '9-29',
          temperature: { high: 20, low: 10 },
          description: 'Sunny',
          hoursOfSun: 8,
          precipitation: {
            hasPrecipitation: undefined,
            precipitationProbability: undefined,
            rainProbability: undefined,
            snowProbability: undefined,
            iceProbability: undefined,
          },
        },
      ];
      const locationKey = '12345';
      mockAxios.get
        .mockResolvedValueOnce({ data: [{ Key: locationKey }] }) // mock a first call to the locationkey, same as above
        .mockResolvedValueOnce({
          data: {
            DailyForecasts: [
              {
                Date: '2023-09-29T00:00:00-04:00',
                Temperature: { Maximum: { Value: 20 }, Minimum: { Value: 10 } },
                Day: { IconPhrase: 'Sunny' },
                HoursOfSun: 8,
              },
            ],
          },
        }); 
    
      const result = await service.getDailyForecast(city, days);
      expect(result).toEqual(forecastData);
    });
    
    it('should handle an invalid city by throwing an error', async () => {
      const city = 'UnknownCity';
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: [] }); // mock getLocationKey failure
      await expect(service.getDailyForecast(city, 5)).rejects.toThrow(
        'Location not found',
      );
    });

    it('should correctly format the date in the response', async () => {
      const city = 'Tokyo';
      const days = 5;
      const mockData = {
        DailyForecasts: [
          {
            Date: '2024-06-25T09:41:00-04:00',
            Temperature: {
              Maximum: { Value: 30 },
              Minimum: { Value: 25 },
            },
            Day: {
              IconPhrase: 'Sunny',
              HasPrecipitation: false,
              PrecipitationProbability: 0,
              RainProbability: 0,
              SnowProbability: 0,
              IceProbability: 0,
            },
            HoursOfSun: 8,
          },
        ],
      };
      const expectedFormattedDate = '6-25';
      mockAxios.get
        .mockResolvedValueOnce({ data: [{ Key: '12345' }] }) // mock getLocationKey success
        .mockResolvedValueOnce({ data: mockData }); // mock getDailyForecast API response
// testing the date truncation logic i added to getDailyForecast
      const result = await service.getDailyForecast(city, days);
      expect(result[0].date).toEqual(expectedFormattedDate);
    });

    it('should limit the forecast to 5 days even if more are returned', async () => {
      const city = 'Sydney';
      const days = 10; // Requesting more days than the limit
      const mockData = {
        DailyForecasts: new Array(10).fill({
          Date: '2024-07-01T09:41:00-04:00',
          Temperature: {
            Maximum: { Value: 20 },
            Minimum: { Value: 15 },
          },
          Day: {
            IconPhrase: 'Partly cloudy',
            HasPrecipitation: true,
            PrecipitationProbability: 50,
            RainProbability: 30,
            SnowProbability: 0,
            IceProbability: 0,
          },
          HoursOfSun: 5,
        }),
      };
      mockAxios.get
        .mockResolvedValueOnce({ data: [{ Key: '67890' }] }) 
        .mockResolvedValueOnce({ data: mockData }); 

      const result = await service.getDailyForecast(city, days);
      expect(result.length).toEqual(5); // Should only return 5 days, because i believe that's the API limit for my plan. not sure if that was spelled out
      // explicitly in there API docs but i saw this when postman testing.
    });
  });
});
