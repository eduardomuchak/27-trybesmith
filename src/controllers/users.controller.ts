import { Request, Response } from 'express';
import UsersService from '../services/users.service';
import getToken from '../services/jwt.service';

class UsersController {
  constructor(private usersService = new UsersService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const users = await this.usersService.getAll();
    res.status(200).json(users);
  };

  public create = async (req: Request, res: Response) => {
    const user = req.body;

    const userCreated = await this.usersService.create(user);
    const token = getToken({ id: userCreated.id });
    res.status(201).json({ token });
  };
}

export default UsersController;