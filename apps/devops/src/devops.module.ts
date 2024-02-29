import { Module } from '@nestjs/common';
import { DevopsController } from './devops.controller';
import { DevopsService } from './devops.service';

@Module({
  imports: [],
  controllers: [DevopsController],
  providers: [DevopsService],
})
export class DevopsModule {}
