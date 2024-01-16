import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'helpers/config';
import { extname } from 'path';
import { FilterProductDto } from './dto/filterProductDto';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateResult } from 'typeorm';

@UseGuards(AuthGuard)
@UsePipes(ValidationPipe)
@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }

    @Post('create')
    @UseInterceptors(FileInterceptor('image', {
        storage: storageConfig('product'),
        fileFilter: (req, file, cb) => {
            const ext = extname(file.originalname);
            const allowedExtArr = ['.jpg', '.png', '.jpeg'];
            if (!allowedExtArr.includes(ext)) {
                req.fileValidationError = `Chỉ sử dụng file đuôi ${allowedExtArr.toString()}`;
                cb(null, false);
            } else {
                const fileSize = parseInt(req.headers['content-length']);
                if (fileSize > 1024 * 1024 * 5) {
                    req.fileValidationError = 'file khong duowcj lon hon 5MB';
                    cb(null, false);
                } else {
                    cb(null, true);
                }
            }
        }
    }))
    create(@Req() req: any, @Body() createProductDto: CreateProductDto, @UploadedFile() file: Express.Multer.File) {
        if (req.fileValidationError) {
            throw new BadRequestException(req.fileValidationError);
        }
        if (!file) {
            throw new BadRequestException('Nhap anh');
        }
        return this.productService.create({ ...createProductDto, image: file.destination + '/' + file.filename });
    }

    @Get()
    findAll(@Query() query: FilterProductDto): Promise<any> {
        return this.productService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Product> {
        return this.productService.findOne(Number(id));
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('image', {
        storage: storageConfig('product'),
        fileFilter: (req, file, cb) => {
            const ext = extname(file.originalname);
            const allowedExtArr = ['.jpg', '.png', '.jpeg'];
            if (!allowedExtArr.includes(ext)) {
                req.fileValidationError = `Chỉ sử dụng file đuôi ${allowedExtArr.toString()}`;
                cb(null, false);
            } else {
                const fileSize = parseInt(req.headers['content-length']);
                if (fileSize > 1024 * 1024 * 5) {
                    req.fileValidationError = 'file khong duowcj lon hon 5MB';
                    cb(null, false);
                } else {
                    cb(null, true);
                }
            }
        }
    }))
    updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Req() req: any, @UploadedFile() file: Express.Multer.File) {
        if (req.fileValidationError) {
            throw new BadRequestException(req.fileValidationError);
        }
        if (file) {
            updateProductDto.image = file.destination + '/' + file.filename;
        }
        return this.productService.updateProduct(Number(id), updateProductDto);
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: string) {
        return this.productService.deleteProduct(Number(id));
    }
}
