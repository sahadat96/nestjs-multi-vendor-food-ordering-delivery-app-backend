import { CustomerEntity } from "../entities/customer.entity";

export interface ICustomerRepository {

  findByUserId(userId: string): Promise<CustomerEntity | null>;

  create(data: {
    userId: string;
    latitude: number;
    longitude: number;
    address?: string;
  }): Promise<any>;

  updateLocation(
    userId: string,
    data: {
      latitude: number;
      longitude: number;
      address?: string;
    },
  ): Promise<any>;
}