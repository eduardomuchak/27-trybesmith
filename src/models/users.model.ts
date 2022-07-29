import { Pool } from 'mysql2/promise';
import User from '../interfaces/users.interface';

class UsersModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<User[]> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.Users');
    const [rows] = result;
    return rows as User[];
  }
}

export default UsersModel;