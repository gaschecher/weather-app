import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

describe('WeatherController', () => {
  let controller: WeatherController;
// setup before each test for consistency and DRY code
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [WeatherService],
    }).compile();

    controller = module.get<WeatherController>(WeatherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

// heavy use of mocks here, which lowers some of the fidelity of the test
// but its for demonstration purposes
describe('WeatherController Methods', () => {

  // i nested the describe statements here since it made sense with nest.js layout
  // of controllers and the nested routes, but some people dislike this
  describe('getCurrentWeather', () => {
    it('should return current weather data for a given city', async () => {
      const result = { temperature: 20, description: 'sunny' };
      const mockWeatherService = {
        getCurrentWeather: jest.fn(() => Promise.resolve(result)),
      };
      const controller = new WeatherController(mockWeatherService as any);

      expect(await controller.getCurrentWeather('London')).toEqual(result);
    });

    it('should handle and throw exceptions', async () => {
      const mockWeatherService = {
        getCurrentWeather: jest.fn(() =>
          Promise.reject(new Error('Service unavailable')),
        ),
      };
      const controller = new WeatherController(mockWeatherService as any);

      await expect(controller.getCurrentWeather('London')).rejects.toThrow(
        'Service unavailable',
      );
    });
  });

  // another mocked function
  describe('getDailyForecast', () => {
    it('should return daily forecast data for a given city and number of days', async () => {
      const result = [
        { day: 'Monday', temperature: 22, description: 'cloudy' },
      ];
      const mockWeatherService = {
        getDailyForecast: jest.fn(() => Promise.resolve(result)),
      };
      const controller = new WeatherController(mockWeatherService as any);

      expect(await controller.getDailyForecast('London', 3)).toEqual(result);
    });
// note this isn't actually testing the underlying service or controller since it's mocked
// you'll see the real service/controller doesn't have actual error throwing for this demo project
    it('should handle and throw exceptions', async () => {
      const mockWeatherService = {
        getDailyForecast: jest.fn(() =>
          Promise.reject(new Error('Service unavailable')),
        ),
      };
      const controller = new WeatherController(mockWeatherService as any);

      await expect(controller.getDailyForecast('London', 3)).rejects.toThrow(
        'Service unavailable',
      );
    });
  });
});


