import { IsNumber } from "class-validator";
import { Category } from "src/category/entities/category.entity";

export class UpdateProductDto {
    name: string;
    description: string;
    image: string;
    category: Category;
}