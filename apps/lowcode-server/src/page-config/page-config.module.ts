import { Module } from '@nestjs/common';
import { PageConfigService } from './page-config.service';
import { PageConfigController } from './page-config.controller';

@Module({
  controllers: [PageConfigController],
  providers: [PageConfigService],
})
export class PageConfigModule {}
