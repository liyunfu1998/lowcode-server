import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from '../../../libs/comm/src/utils';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ ignoreEnvFile: true, load: [getConfig] }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
