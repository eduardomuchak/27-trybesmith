import { Request, Response } from 'express';
import UsersService from '../services/users.service';

class UsersController {
  constructor(private usersService = new UsersService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const users = await this.usersService.getAll();
    res.status(200).json(users);
  };
}

export default UsersController;