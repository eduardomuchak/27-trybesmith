import { Pool, ResultSetHeader } from 'mysql2/promise';
import { Order } from '../interfaces/orders.interface';

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

  public async create(userId: number): Promise<Order> {
    const query = `
    INSERT INTO Trybesmith.Orders (userId) VALUES (?);
    `;
    const result = await this.connection.execute<ResultSetHeader>(
      query,
      [userId],
    );
    const { insertId } = result[0];
    return { id: insertId, userId } as Order;
  }

  public async updateProducts(orderId: number | undefined, productId: number): Promise<void> {
    const query = `
    UPDATE Trybesmith.Products 
    SET orderId = ? 
    WHERE id =?;
    `;
    await this.connection.execute<ResultSetHeader>(query, [orderId, productId]);
  }

  public async getUserIdByUsername(username: string): Promise<number> {
    const query = `
    SELECT id FROM Trybesmith.Users WHERE username = ?;
    `;
    const result = await this.connection.execute(query, [username]);
    const [rows] = result;
    const [user] = rows as { id: number }[];
    return user.id;
  }
}

export default OrdersModel;