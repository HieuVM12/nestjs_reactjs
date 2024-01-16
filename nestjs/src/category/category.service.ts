import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FilterProductDto } from 'src/product/dto/filterProductDto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) { }

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        // const existingCategory = await this.categoryRepository.findOneBy({ name: createCategoryDto.name });
        // if (existingCategory) {
        //     throw new ConflictException('Category with this name already exists');
        // }
        return await this.categoryRepository.save(createCategoryDto);
    }

    async findAll(query: FilterProductDto): Promise<any> {
        const items_per_page = Number(query.items_per_page) || 10;
        const page = Number(query.page) || 1;
        const skip = (page - 1) * items_per_page;
        let result = await this.categoryRepository.createQueryBuilder('category');
        if (query.search) {
            const search = query.search;
            result.where('(category.name LIKE :search OR category.description LIKE :search)', { search: `%${search}%` });
        }
        result.orderBy('created_at', 'DESC')
            .skip(skip)
            .take(items_per_page)
            .select([
                'category.id',
                'category.name',
                'category.description',
                'category.created_at',
                'category.updated_at',
            ])
        const [res, total] = await result.getManyAndCount();
        const lastPage = Math.ceil(total / items_per_page);
        const nextPage = page + 1 > lastPage ? null : page + 1;
        const prevPage = page - 1 < 1 ? null : page - 1
        return {
            data: res,
            total,
            items_per_page,
            currentPage: page,
            nextPage,
            prevPage,
            lastPage
        };
    }

    async findOne(id: number): Promise<Category> {
        return await this.categoryRepository.findOneBy({ id });
    }

    async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<UpdateResult> {
        return await this.categoryRepository.update(id, updateCategoryDto);
    }

    async deleteCategory(id: number): Promise<DeleteResult> {
        return await this.categoryRepository.softDelete(id);
    }
}
