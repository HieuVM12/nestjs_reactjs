import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { Category } from "src/category/entities/category.entity";

export class CreateProductDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    image: string;

    @ApiProperty()
    @IsNotEmpty()
    category!: Category;
}