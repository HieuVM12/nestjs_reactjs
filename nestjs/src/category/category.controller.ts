import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { FilterProductDto } from 'src/product/dto/filterProductDto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@UseGuards(AuthGuard)
@UsePipes(ValidationPipe)
@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) { }

    @Post('create')
    create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.categoryService.create(createCategoryDto);
    }

    @Get()
    findAll(@Query() query: FilterProductDto): Promise<any> {
        return this.categoryService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Category> {
        return this.categoryService.findOne(Number(id));
    }

    @Put(':id')
    updateCategory(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoryService.updateCategory(Number(id), updateCategoryDto);
    }

    @Delete(':id')
    deleteCategory(@Param('id') id: string) {
        return this.categoryService.deleteCategory(Number(id));
    }
}
