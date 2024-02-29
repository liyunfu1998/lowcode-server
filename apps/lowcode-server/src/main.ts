import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType, VERSION_NEUTRAL } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 统一返回格式
  app.useGlobalInterceptors(new TransformInterceptor())
  
  // 接口版本化管理
  app.enableVersioning({
    defaultVersion: [VERSION_NEUTRAL, '1', '2'],
    type: VersioningType.URI
  })
  
  await app.listen(3000);
}
bootstrap();
