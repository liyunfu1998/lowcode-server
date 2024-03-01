import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './utils';
@Module({
  imports: [ConfigModule.forRoot({ ignoreEnvFile: true, load: [getConfig] })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
