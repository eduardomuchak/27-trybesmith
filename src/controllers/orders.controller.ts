import { Request, Response } from 'express';
import { validateToken } from '../services/jwt.service';
import OrdersService from '../services/orders.service';

class OrdersController {
  constructor(private ordersService = new OrdersService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.ordersService.getAll();
    res.status(200).json(orders);
  };

  public create = async (req: Request, res: Response) => {
    const { productsIds } = req.body;

    let token = '';
    if (req.headers.authorization) {
      token = req.headers.authorization;
    } else {
      res.status(401).json({ message: 'Token not found' });
    }

    const userInfo = validateToken(token);

    const userId = await this.ordersService.getUserIdByUsername(userInfo.username);

    if (userInfo && userId) {
      const order = await this.ordersService.create(userId, productsIds);
      res.status(201).json(order);
    }
  };
}

export default OrdersController;