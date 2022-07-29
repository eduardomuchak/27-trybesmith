import { Pool } from 'mysql2/promise';
import Order from '../interfaces/orders.interface';

class OrdersModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    // Referência para JSON_ARRAYAGG() no MySQL:
    // https://database.guide/json_arrayagg-create-a-json-array-from-the-rows-of-a-query-in-mysql/
    const query = `
    SELECT 
      o.id, o.userId, JSON_ARRAYAGG(p.id) AS productsIds
    FROM
        Trybesmith.Products AS p
            INNER JOIN
        Trybesmith.Orders AS o ON o.id = p.orderId
    GROUP BY o.id
    ORDER BY o.userId;
    `;
    const result = await this.connection
      .execute(query);
    const [rows] = result;
    return rows as Order[];
  }
}

export default OrdersModel;