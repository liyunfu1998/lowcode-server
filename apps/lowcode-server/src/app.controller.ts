import { Controller, Get, VERSION_NEUTRAL, Version } from '@nestjs/common';
import { AppService } from './app.service';

@Controller({
  path: 'user',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Version([VERSION_NEUTRAL, '1'])
  findAll(){
    return 'i am old one'
  }

  @Get()
  @Version('2')
  findAdd2(){
    return 'i am new one'
  }
}
