export interface CartItem{
  id: number;
  name: string;
  price: number;
  quantity: number;
  product: string;

}

export interface Cart{
  items: Array<CartItem>;
}

export interface Wishlist{
  items: Array<CartItem>;
}
