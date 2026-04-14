import { CustomerEntity } from "../../domain/entities/customer.entity";
import { CustomerResponseDto } from "../../presentation/dto/customer.response.dto";

export class CustomerMapper {
  static toResponse(entity: CustomerEntity): CustomerResponseDto {
    return {
      id: entity.id,
      latitude: entity.latitude,
      longitude: entity.longitude,
      address: entity.address,
    };
  }
}