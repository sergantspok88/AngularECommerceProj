import { Product } from './product.model'

export class CartItem {
  constructor(
    public id: string,
    public product: Product,
    public userId: string,
    public quantity: number
  ) {}
}
