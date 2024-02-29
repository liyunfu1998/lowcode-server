import { Module } from '@nestjs/common';
import { CommService } from './comm.service';

@Module({
  providers: [CommService],
  exports: [CommService],
})
export class CommModule {}
