import { IsOptional, Matches } from "class-validator";

export class FilterProductDto {
    page: string;
    items_per_page: string;
    search: string

    @IsOptional()
    @Matches(/^\d+$/, { message: 'Category must be a number.' })
    category?: string;
}