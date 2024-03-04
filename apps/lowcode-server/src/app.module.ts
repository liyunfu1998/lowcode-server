import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from '../../../libs/comm/src/utils';
import { UserModule } from './user/user.module';
import { SiteModule } from './site/site.module';
import { PageModule } from './page/page.module';
import { PageConfigModule } from './page-config/page-config.module';
@Module({
  imports: [
    ConfigModule.forRoot({ ignoreEnvFile: true, load: [getConfig] }),
    UserModule,
    SiteModule,
    PageModule,
    PageConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
