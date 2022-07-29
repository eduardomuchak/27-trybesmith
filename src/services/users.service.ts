import connection from '../models/connection';
import UsersModel from '../models/users.model';
import User from '../interfaces/users.interface';

class ProductsService {
  public model: UsersModel;

  constructor() {
    this.model = new UsersModel(connection);
  }

  public async getAll(): Promise<User[]> {
    const products = await this.model.getAll();
    return products;
  }

  public async create(user: User): Promise<User> {
    return this.model.create(user);
  }
}

export default ProductsService;