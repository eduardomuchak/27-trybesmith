import Joi from 'joi';
import connection from '../models/connection';
import OrdersModel from '../models/orders.model';
import { Order, UserAndProductsIds } from '../interfaces/orders.interface';
import ProductsModel from '../models/products.model';

function validateOrder(data: UserAndProductsIds) {
  const orderSchema = Joi.object({
    userId: Joi.number(),
    productsIds: Joi.array().items(Joi.number()).min(1).required(),
  });
  const { error } = orderSchema.validate(data);
  if (error) {
    error.name = 'ValidationError';
    throw error;
  }
  return data;
}

class OrdersService {
  public model: OrdersModel;

  public productModel: ProductsModel;

  constructor() {
    this.model = new OrdersModel(connection);
    this.productModel = new ProductsModel(connection);
  }

  public async getAll(): Promise<Order[]> {
    const orders = await this.model.getAll();
    return orders;
  }

  public async create(userId: number, productsIds: number[]): Promise<UserAndProductsIds> {
    validateOrder({ userId, productsIds });
    const { id } = await this.model.create(userId);

    await Promise.all(productsIds.map(async (productId) => {
      await this.productModel.update(id, productId);
    }));

    return { userId, productsIds };
  }
}

export default OrdersService;