import express from 'express';
import 'express-async-errors';
import ProductsRoutes from './routes/products.routes';
import UsersRoutes from './routes/users.routes';
import OrdersRoutes from './routes/orders.routes';
import LoginRoutes from './routes/login.routes';
import errorHandlerMiddleware from './middlewares/error.middleware';

const app = express();

app.use(express.json());

app.use(LoginRoutes);
app.use(ProductsRoutes);
app.use(UsersRoutes);
app.use(OrdersRoutes);
app.use(errorHandlerMiddleware);

export default app;
