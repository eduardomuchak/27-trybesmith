import Joi from 'joi';
import connection from '../models/connection';
import ProductsModel from '../models/products.model';
import Product from '../interfaces/products.interface';

function validateProduct(data: Product) {
  const productSchema = Joi.object({
    name: Joi.string().min(3).required(),
    amount: Joi.string().min(3).required(),
  });
  const { error } = productSchema.validate(data);
  if (error) {
    error.name = 'ValidationError';
    throw error;
  }
  return data;
}

class ProductsService {
  public model: ProductsModel;

  constructor() {
    this.model = new ProductsModel(connection);
  }

  public async getAll(): Promise<Product[]> {
    const products = await this.model.getAll();
    return products;
  }

  public async create(product: Product): Promise<Product> {
    validateProduct(product);
    return this.model.create(product);
  }

  public async update(orderId: number | undefined, productId: number): Promise<void | null> {
    return this.model.update(orderId, productId);
  }
}

export default ProductsService;