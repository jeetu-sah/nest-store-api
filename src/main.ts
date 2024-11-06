import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply global validation with strict error handling
  app.useGlobalPipes(
    new ValidationPipe()
  );
  app.enableCors({
    origin: 'http://localhost:3001', // Allow only your frontend's origin
    methods: 'GET,POST,PUT,DELETE',  // Allowed methods
    allowedHeaders: 'Content-Type,Authorization', // Allowed headers
  });
  await app.listen(3000);
}
bootstrap();
