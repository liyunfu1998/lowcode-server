import { Controller, Get } from '@nestjs/common';
import { DevopsService } from './devops.service';

@Controller()
export class DevopsController {
  constructor(private readonly devopsService: DevopsService) {}

  @Get()
  getHello(): string {
    return this.devopsService.getHello();
  }
}
