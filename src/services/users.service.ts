import Joi from 'joi';
import connection from '../models/connection';
import UsersModel from '../models/users.model';
import User from '../interfaces/users.interface';
import getToken from './jwt.service';

function validateUser(data: User) {
  const userSchema = Joi.object({
    username: Joi.string().min(3).required(),
    classe: Joi.string().min(3).required(),
    level: Joi.number().min(1).required(),
    password: Joi.string().min(8).required(),
  });
  const { error } = userSchema.validate(data);
  if (error) {
    error.name = 'ValidationError';
    throw error;
  }
  return data;
}
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
    validateUser(user);
    return this.model.create(user);
  }
}

export default ProductsService;