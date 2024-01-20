import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
ConfigModule.forRoot();


console.log(process.env.MONGO_URL);

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URL), TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
