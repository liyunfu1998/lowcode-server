import { NestFactory } from '@nestjs/core';
import { DevopsModule } from './devops.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(DevopsModule);

  // 接口版本化管理
  app.enableVersioning({
    type: VersioningType.URI
  })
  
  await app.listen(3001);
}
bootstrap();
