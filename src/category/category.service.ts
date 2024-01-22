import { Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryI } from 'src/schemas/category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(@InjectModel('category') private categoryModel: Model<CategoryI>) {}

  async create(createTaskDto: CreateCategoryDto, userId: string) {
    const category = await this.categoryModel.create({ ...createTaskDto, user: userId });
    return category;
  }

  async findAll(userId: string) {
    const categories = await this.categoryModel.find({ user: userId});
    return categories;
  }

  async remove(id: string, userId: string) {
    const category = await this.categoryModel.findById(id);

    if(!category) {
      throw new NotFoundException('Category not found');
    }

    if (category.user != userId) {
      throw new UnauthorizedException('You are not authorized to delete this task');
    }

    await category.deleteOne();
    
    return { message: 'Category deleted' };
  }
}
