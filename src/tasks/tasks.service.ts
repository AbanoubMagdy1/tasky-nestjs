import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import Task from 'src/schemas/task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<typeof Task>) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = await this.taskModel.create(createTaskDto);
    return task;
  }

  async findAll() {
    const tasks = await this.taskModel.find();
    return tasks;
  }

  async findOne(id: string) {
    const task = await this.taskModel.findById(id);
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true });
    return task;
  }

  async remove(id: string) {
    await this.taskModel.findByIdAndDelete(id);
    return { message: 'Task deleted'}
  }
}
