import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from '../../../libs/comm/src/utils';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({ ignoreEnvFile: true, load: [getConfig] }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
