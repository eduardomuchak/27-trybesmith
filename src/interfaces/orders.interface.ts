export interface Order {
  id?: number;
  userId: number;
}
export interface UserAndProductsIds {
  userId: number;
  productsIds: number[];
}