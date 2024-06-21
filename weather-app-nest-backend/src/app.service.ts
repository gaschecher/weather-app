import { Injectable } from '@nestjs/common';


// healthcheck logic, see controller
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
