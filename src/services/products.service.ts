import connection from '../models/connection';
import ProductsModel from '../models/products.model';
import Product from '../interfaces/products.interface';

class ProductsService {
  public model: ProductsModel;

  constructor() {
    this.model = new ProductsModel(connection);
  }

  public async getAll(): Promise<Product[]> {
    const products = await this.model.getAll();
    return products;
  }
}

export default ProductsService;