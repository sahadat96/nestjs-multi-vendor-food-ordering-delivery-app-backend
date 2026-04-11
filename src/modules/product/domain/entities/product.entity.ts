export class Product {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public isActive: boolean,
    public vendorId: string,
    public categoryId?: string,
    public createdAt?: Date,
  ) {}
}