import { Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {TaskI} from 'src/schemas/task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel('task') private taskModel: Model<TaskI>) {}

  async create(createTaskDto: CreateTaskDto, userId: string) {
    const task = await this.taskModel.create({ ...createTaskDto, user: userId });
    return task;
  }

  async findAll(userId: string) {
    const tasks = await this.taskModel.find({ user: userId}).populate({path: 'category', select: 'name'});
    return tasks;
  }

  async findOne(id: string) {
    const task = await this.taskModel.findById(id);
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string) {
    const task = await this.taskModel.findById(id);
    if(task.user != userId) {
      throw new UnauthorizedException('You are not authorized to edit this task');
    }
    Object.assign(task, updateTaskDto);
    await task.save();
    return task;
  }

  async remove(id: string, userId: string) {
    const task = await this.taskModel.findById(id);

    if(!task) {
      throw new NotFoundException('Task not found');
    }
    if (task.user != userId) {
      throw new UnauthorizedException('You are not authorized to delete this task');
    }

    await task.deleteOne();
    
    return { message: 'Task deleted' };
  }
}
