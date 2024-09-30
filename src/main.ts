import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply global validation with strict error handling
  app.useGlobalPipes(
    new ValidationPipe()
  );

  await app.listen(3000);
}
bootstrap();
