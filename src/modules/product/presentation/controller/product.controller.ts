import { Controller, Req, Post, Body, Request, UseGuards, Get, UseInterceptors, UploadedFiles, Query } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { RoleGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { CurrentUser } from '@/modules/auth/decorators/get-user.decorator';
import type { AuthUser } from '@/modules/auth/domain/interfaces/auth-user.interface';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductService } from '../../application/product.service';
import { CreateProductDto } from '../dto/product.dto';
import { ProductResponseDto } from '../dto/product.response.dto';
import { SearchProductQueryDto } from '../dto/searchQuery.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get('get/cuisines')
  @UseGuards(RoleGuard)
  @Roles(Role.VENDOR)
  @ResponseMessage('Cuisines Get Successfull.')
  @ApiOperation({ summary: 'Cuisines' })
  @ApiResponse({ status: 200, description: 'Get Cuisines Successfull' })
  async getVendorCuisines(
    @CurrentUser() user: AuthUser,
  ) {
    return this.service.getVendorCuisines(user.id);
  }

  @Post('create/product')
  @UseGuards(RoleGuard)
  @Roles(Role.VENDOR)
  @UseInterceptors(FilesInterceptor('productImage', 5))
  @ResponseMessage('Product Create Successfull.')
  async create(
    @CurrentUser() user: AuthUser,
    @Body() dto: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.service.createProduct(user.id, dto, files);
  }

  @Get('get/my-products')
  @UseGuards(RoleGuard)
  @Roles(Role.VENDOR)
  async getMyProducts(
    @CurrentUser() user: AuthUser,
  ): Promise<ProductResponseDto[]> {
    return this.service.getVendorProducts(user.id);
  }

  @Get('vendor-product/search')
  @UseGuards(RoleGuard)
  @Roles(Role.VENDOR)
  async searchProducts(
    @CurrentUser() user: AuthUser,
    @Query() query: SearchProductQueryDto,
  ) {
    return this.service.searchProducts(user.id, query);
  }

}
