import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { ApiResponse } from '@nestjs/swagger';
import { CurrentWeatherDto } from './dto/current-weather.dto';
import { ForecastDto } from './dto/forecast-weather.dtos';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('current')
  // this is to annotate the responses, helps show all the types of the responses
  // for swagger :)
  @ApiResponse({
    status: 200,
    description: 'Current weather data',
    type: CurrentWeatherDto
  })
  // ran out of time but i meant to trim down this enormous payload that accuweather
  // returns by default like i did for the forecast and completions
  async getCurrentWeather(
    @Query('city') city: string,
  ): Promise<any> {
    return this.weatherService.getCurrentWeather(city);
  }

  @Get('forecast')
  // this is to annotate the responses, helps show all the types of the responses
  // for swagger :)
  @ApiResponse({
    status: 200,
    description: 'Daily forecast data',
    type: [ForecastDto],
  })
  async getDailyForecast(
    @Query('city') city: string,
    @Query('days') days: number,
  ) {
    return this.weatherService.getDailyForecast(city, days);
  }
}
// 