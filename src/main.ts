import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/global-exception.filter';
import { SwaggerDocumentBuilder } from './config/swagger/swagger-document-builder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure Global Prefix
  app.setGlobalPrefix(`api/${process.env.API_VERSION}`);

  // Configure Swagger
  const swaggerDocumentBuilder = new SwaggerDocumentBuilder(app);
  swaggerDocumentBuilder.buildDocument();

  // Configure Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  // Configure Global Filters
  app.useGlobalFilters(new AllExceptionsFilter());

  // Start Server
  console.log('Server is running on port', process.env.PORT ?? 3000);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
