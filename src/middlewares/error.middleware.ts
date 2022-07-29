import { Request, Response, NextFunction } from 'express';
import Error from '../interfaces/error.interface';

const errorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const { message, status } = err;
  return res.status(status).json({ message });
};

export default errorMiddleware;