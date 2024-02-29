import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType, VERSION_NEUTRAL } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 接口版本化管理
  app.enableVersioning({
    defaultVersion: [VERSION_NEUTRAL, '1', '2'],
    type: VersioningType.URI
  })
  
  await app.listen(3000);
}
bootstrap();
