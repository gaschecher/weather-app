import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherController } from './weather/weather.controller';
import { WeatherService } from './weather/weather.service';
import { WeatherModule } from './weather/weather.module';
import { CompletionsController } from './completions/completions.controller';
import { CompletionsService } from './completions/completions.service';
import { CompletionsModule } from './completions/completions.module';

@Module({
  imports: [WeatherModule, CompletionsModule],
  controllers: [AppController, WeatherController, CompletionsController],
  providers: [AppService, WeatherService, CompletionsService],
})
export class AppModule {}
