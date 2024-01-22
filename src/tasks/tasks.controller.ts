import { Controller, Get, Post, Body, Put, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import IsAuthGuard from 'src/guards/isAuth';

@Controller('tasks')
@UseGuards(IsAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: any) {
    return this.tasksService.create(createTaskDto, req.userId);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.tasksService.findAll(req.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Req() req: any) {
    return this.tasksService.update(id, updateTaskDto, req.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.tasksService.remove(id, req.userId);
  }
}
