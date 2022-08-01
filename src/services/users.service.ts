import connection from '../models/connection';
import UsersModel from '../models/users.model';
import User from '../interfaces/users.interface';
import getToken from './jwt.service';

class ProductsService {
  public model: UsersModel;

  constructor() {
    this.model = new UsersModel(connection);
  }

  public async login(data: User): Promise<string> {
    const { username, password } = data;
    const allUsers = await this.model.getAll();
    const userInDB = allUsers.find((user) => user.username === username);
    if (!userInDB) {
      const myError = new Error('Username or password invalid');
      myError.name = 'UnauthorizedError';
      throw myError;
    }
    if (userInDB.password !== password) {
      const myError = new Error('Username or password invalid');
      myError.name = 'UnauthorizedError';
      throw myError;
    }
    return getToken(data);
  }

  public async getAll(): Promise<User[]> {
    const products = await this.model.getAll();
    return products;
  }

  public async getById(id: number): Promise<User> {
    const user = await this.model.getById(id);
    return user;
  }

  public async create(user: User): Promise<User> {
    return this.model.create(user);
  }
}

export default ProductsService;