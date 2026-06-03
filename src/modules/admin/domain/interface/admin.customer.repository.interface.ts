import { 
  VerificationStatus,
  Customer,
 } from '@prisma/client';

import { 
  VendorVerificationSort,
 } from '../../presentation/dto/admin.dto';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
}

export interface FindAllCustomersParams {
  where: any;      
  page: number;
  limit: number;
  orderBy: any; 
}

//Main Interface
export interface IAdminCustomerRepository {
  findAll(
    params: FindAllCustomersParams
  ): Promise<PaginatedResult<Customer>>;
}