import { NestFactory } from '@nestjs/core';
import { DevopsModule } from './devops.module';

async function bootstrap() {
  const app = await NestFactory.create(DevopsModule);
  await app.listen(3001);
}
bootstrap();
