import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // this is a healthcheck controller route for the cloud deployments and load balancers
  // also, in a prod app you'd have similar logic but just call it /healthcheck
  // i just left it as / instead because that made me have to confiugre less on the cloud side
  // since most AWS architecture like ECS etc defaults to pinging / instead of /healthcheck unless you override it.
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
