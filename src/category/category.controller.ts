import { Controller, Get, Post, Body, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import IsAuthGuard from 'src/guards/isAuth';

@Controller('categories')
@UseGuards(IsAuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createTaskDto: CreateCategoryDto, @Req() req: any) {
    return this.categoryService.create(createTaskDto, req.userId);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.categoryService.findAll(req.userId);
  } 

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.categoryService.remove(id, req.userId);
  }
}
