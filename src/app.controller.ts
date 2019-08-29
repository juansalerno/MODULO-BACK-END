import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
// @Controller() ===> si no tiene parametros va a estar en el raiz
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
