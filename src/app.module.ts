import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { APP_FILTER } from '@nestjs/core';
import { MongooseExceptionFilter } from './errors/handleMongoError';
import { CategoryModule } from './category/category.module';
ConfigModule.forRoot();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL), TasksModule, UsersModule, CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, {provide: APP_FILTER, useClass: MongooseExceptionFilter}],
})
export class AppModule {}
