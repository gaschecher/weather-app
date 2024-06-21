import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ACCUWEATHER_API_KEY, ACCUWEATHER_BASE_URL } from '../consts';

@Injectable()
export class WeatherService {

  async getLocationKey(city: string) {
    const url = `${ACCUWEATHER_BASE_URL}/locations/v1/cities/search?apikey=${ACCUWEATHER_API_KEY}&q=${city}`;
    const response = await axios.get(url);
    if (response.data && response.data.length > 0) {
      return response.data[0].Key;
    }
    throw new Error('Location not found');
  }

  async getCurrentWeather(city: string) {
    const locationKey = await this.getLocationKey(city);
    const url = `${ACCUWEATHER_BASE_URL}/currentconditions/v1/${locationKey}?apikey=${ACCUWEATHER_API_KEY}&details=true`;
    const response = await axios.get(url);
    return response.data;
  }

  async getDailyForecast(city: string, days: number = 5) {
    const locationKey = await this.getLocationKey(city);
    const url = `${ACCUWEATHER_BASE_URL}/forecasts/v1/daily/${days}day/${locationKey}?apikey=${ACCUWEATHER_API_KEY}&details=true`;
    const response = await axios.get(url);
    
    // Clip the forecast to 5 days per my API plan limit
    const dailyForecasts = response.data.DailyForecasts.slice(0, 5);

  
    // Create a new payload with the required fields as the current payload is MASSIVE
    const newPayload = dailyForecasts.map((forecast: any) => {
      const date = new Date(forecast.Date); //fixing the date format from '2024-06-25T09:41:00-04:00' to '06-25'
      const formattedDate = `${date.getMonth() + 1}-${date.getDate()}`;

      return {
        date: formattedDate,
        temperature: {
          high: forecast.Temperature.Maximum.Value,
          low: forecast.Temperature.Minimum.Value,
        },
        description: forecast.Day.IconPhrase,
        hoursOfSun: forecast.HoursOfSun,
        precipitation: {
          hasPrecipitation: forecast.Day.HasPrecipitation,
          precipitationProbability: forecast.Day.PrecipitationProbability,
          rainProbability: forecast.Day.RainProbability,
          snowProbability: forecast.Day.SnowProbability,
          iceProbability: forecast.Day.IceProbability,
        },
      };
    });
  
    return newPayload;
  }
  
}