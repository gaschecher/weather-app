import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {

  // cors config to be testable from localhost but also the apps CNAMEs
  const corsOptions: CorsOptions = {
    origin: ['http://localhost:3000', 'https://weatherapp.gabriellacodes.com', 'https://www.weatherapp.gabriellacodes.com'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  };
  const app = await NestFactory.create(AppModule);
  
  app.enableCors(corsOptions);
// this is live-linked with swagger so any changes automatically show in 
// https://weatherapi.gabriellacodes.com/swagger
  const config = new DocumentBuilder()
    .setTitle('Weather API')
    .setDescription('API for retrieving weather data')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(3000);
}
bootstrap();
