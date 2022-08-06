import { Pool, ResultSetHeader } from 'mysql2/promise';
import Product from '../interfaces/products.interface';

class ProductsModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Product[]> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.Products');
    const [rows] = result;
    return rows as Product[];
  }

  public async create(product: Product): Promise<Product> {
    const { name, amount } = product;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [name, amount],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...product };
  }

  public async update(orderId: number | undefined, productId: number): Promise<void> {
    const query = `
    UPDATE Trybesmith.Products 
    SET orderId = ? 
    WHERE id = ?
    `;
    await this.connection.execute<ResultSetHeader>(query, [orderId, productId]);
  }
}

export default ProductsModel;