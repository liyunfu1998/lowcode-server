import { Injectable } from '@nestjs/common';

@Injectable()
export class DevopsService {
  getHello(): string {
    return 'Hello World!1';
  }
}
