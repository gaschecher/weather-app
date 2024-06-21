import { ApiProperty } from '@nestjs/swagger';
// these are all classes and not interfaces/types as nestjs decorators only work with 
// classes AFAIK
// these API properties are all added to get this to show up in swagger :)

// i meant to trim this down, but i did the current forecast as the very first route 
// and then did all the trimming on the frontend and ran out of time to do it on the backend
export class Imperial {
  @ApiProperty({ description: 'Value of measurement' })
  Value: number;

  @ApiProperty({ description: 'Unit of measurement' })
  Unit: string;

  @ApiProperty({ description: 'Type of unit' })
  UnitType: number;

  @ApiProperty({ description: 'Descriptive phrase', required: false })
  Phrase?: string;
}

export class ApparentTemperature {
  @ApiProperty({ description: 'Metric measurements', type: () => Imperial })
  Metric: Imperial;

  @ApiProperty({ description: 'Imperial measurements', type: () => Imperial })
  Imperial: Imperial;
}

export class PressureTendency {
  @ApiProperty({ description: 'Localized text for pressure tendency' })
  LocalizedText: string;

  @ApiProperty({ description: 'Code for pressure tendency' })
  Code: string;
}

export class Direction {
  @ApiProperty({ description: 'Degrees of direction' })
  Degrees: number;

  @ApiProperty({ description: 'Localized direction description' })
  Localized: string;

  @ApiProperty({ description: 'English direction description' })
  English: string;
}

export class Wind {
  @ApiProperty({ description: 'Wind direction', type: () => Direction })
  Direction: Direction;

  @ApiProperty({ description: 'Wind speed', type: () => ApparentTemperature })
  Speed: ApparentTemperature;
}

export class WindGust {
  @ApiProperty({ description: 'Wind gust speed', type: () => ApparentTemperature })
  Speed: ApparentTemperature;
}

export class PrecipitationSummary {
  @ApiProperty({ description: 'Precipitation summary', type: () => ApparentTemperature })
  Precipitation: ApparentTemperature;

  @ApiProperty({ description: 'Past hour precipitation', type: () => ApparentTemperature })
  PastHour: ApparentTemperature;

  @ApiProperty({ description: 'Past 3 hours precipitation', type: () => ApparentTemperature })
  Past3Hours: ApparentTemperature;

  @ApiProperty({ description: 'Past 6 hours precipitation', type: () => ApparentTemperature })
  Past6Hours: ApparentTemperature;

  @ApiProperty({ description: 'Past 9 hours precipitation', type: () => ApparentTemperature })
  Past9Hours: ApparentTemperature;

  @ApiProperty({ description: 'Past 12 hours precipitation', type: () => ApparentTemperature })
  Past12Hours: ApparentTemperature;

  @ApiProperty({ description: 'Past 18 hours precipitation', type: () => ApparentTemperature })
  Past18Hours: ApparentTemperature;

  @ApiProperty({ description: 'Past 24 hours precipitation', type: () => ApparentTemperature })
  Past24Hours: ApparentTemperature;
}

export class CurrentWeatherDto {
  @ApiProperty({ description: 'Local observation date and time' })
  LocalObservationDateTime: Date;

  @ApiProperty({ description: 'Epoch time' })
  EpochTime: number;

  @ApiProperty({ description: 'Weather condition text' })
  WeatherText: string;

  @ApiProperty({ description: 'Weather icon identifier' })
  WeatherIcon: number;

  @ApiProperty({ description: 'Presence of precipitation' })
  HasPrecipitation: boolean;

  @ApiProperty({ description: 'Type of precipitation', required: false, nullable: true })
  PrecipitationType: string | null;

  @ApiProperty({ description: 'Day or night time' })
  IsDayTime: boolean;

  @ApiProperty({ description: 'Current temperature', type: () => ApparentTemperature })
  Temperature: ApparentTemperature;

  @ApiProperty({ description: 'Real feel temperature', type: () => ApparentTemperature })
  RealFeelTemperature: ApparentTemperature;

  @ApiProperty({ description: 'Real feel temperature in shade', type: () => ApparentTemperature })
  RealFeelTemperatureShade: ApparentTemperature;

  @ApiProperty({ description: 'Relative humidity' })
  RelativeHumidity: number;

  @ApiProperty({ description: 'Indoor relative humidity' })
  IndoorRelativeHumidity: number;

  @ApiProperty({ description: 'Dew point temperature', type: () => ApparentTemperature })
  DewPoint: ApparentTemperature;

  @ApiProperty({ description: 'Wind conditions', type: () => Wind })
  Wind: Wind;

  @ApiProperty({ description: 'Wind gust conditions', type: () => WindGust })
  WindGust: WindGust;

  @ApiProperty({ description: 'UV index' })
  UVIndex: number;

  @ApiProperty({ description: 'UV index text' })
  UVIndexText: string;

  @ApiProperty({ description: 'Visibility conditions', type: () => ApparentTemperature })
  Visibility: ApparentTemperature;

  @ApiProperty({ description: 'Obstructions to visibility' })
  ObstructionsToVisibility: string;

  @ApiProperty({ description: 'Cloud cover percentage' })
  CloudCover: number;

  @ApiProperty({ description: 'Ceiling conditions', type: () => ApparentTemperature })
  Ceiling: ApparentTemperature;

  @ApiProperty({ description: 'Pressure conditions', type: () => ApparentTemperature })
  Pressure: ApparentTemperature;

  @ApiProperty({ description: 'Pressure tendency', type: () => PressureTendency })
  PressureTendency: PressureTendency;

  @ApiProperty({ description: 'Temperature departure in last 24 hours', type: () => ApparentTemperature })
  Past24HourTemperatureDeparture: ApparentTemperature;

  @ApiProperty({ description: 'Apparent temperature', type: () => ApparentTemperature })
  ApparentTemperature: ApparentTemperature;

  @ApiProperty({ description: 'Wind chill temperature', type: () => ApparentTemperature })
  WindChillTemperature: ApparentTemperature;

  @ApiProperty({ description: 'Wet bulb temperature', type: () => ApparentTemperature })
  WetBulbTemperature: ApparentTemperature;

  @ApiProperty({ description: 'Wet bulb globe temperature', type: () => ApparentTemperature })
  WetBulbGlobeTemperature: ApparentTemperature;

  @ApiProperty({ description: 'Precipitation in the last hour', type: () => ApparentTemperature })
  Precip1hr: ApparentTemperature;

  @ApiProperty({ description: 'Summary of precipitation', type: () => PrecipitationSummary })
  PrecipitationSummary: PrecipitationSummary;

  @ApiProperty({ description: 'Mobile link for more details' })
  MobileLink: string;

  @ApiProperty({ description: 'Link for more details' })
  Link: string;
}
