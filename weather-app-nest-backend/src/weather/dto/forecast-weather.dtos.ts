import { ApiProperty } from '@nestjs/swagger';
// these are all classes and not interfaces/types as nestjs decorators only work with 
// classes AFAIK
// these API properties are all added to get this to show up in swagger :)

export class Temperature {
  @ApiProperty({ description: 'Highest temperature for the day' })
  high: number;

  @ApiProperty({ description: 'Lowest temperature for the day' })
  low: number;
}

export class Precipitation {
  @ApiProperty({ description: 'Indicates if precipitation is expected' })
  hasPrecipitation: boolean;

  @ApiProperty({ description: 'Probability of precipitation' })
  precipitationProbability: number;

  @ApiProperty({ description: 'Probability of rain' })
  rainProbability: number;

  @ApiProperty({ description: 'Probability of snow' })
  snowProbability: number;

  @ApiProperty({ description: 'Probability of ice' })
  iceProbability: number;
}

export class ForecastDto {
  @ApiProperty({ description: 'Date of the forecast' })
  date: string;

  @ApiProperty({ description: 'Temperature forecast', type: () => Temperature })
  temperature: Temperature;

  @ApiProperty({ description: 'Weather description for the day' })
  description: string;

  @ApiProperty({ description: 'Number of hours of sun expected' })
  hoursOfSun: number;

  @ApiProperty({ description: 'Precipitation details', type: () => Precipitation })
  precipitation: Precipitation;
}
