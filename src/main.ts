import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongooseExceptionFilter } from './errors/handleMongoError';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new MongooseExceptionFilter());
  await app.listen(5000);
}
bootstrap();
