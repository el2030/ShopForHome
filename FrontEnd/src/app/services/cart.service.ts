import { Injectable } from '@angular/core';
import {BehaviorSubject, filter} from "rxjs";
import {Cart, CartItem} from "../models/cart.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<Cart>({items: []});
  wishlist = new BehaviorSubject<Cart>({items: []});
  constructor(private _snackBar: MatSnackBar) { }

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];
    const itemInCart = items.find((_item) => _item.id === item.id);
    if(itemInCart){
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }
    this.cart.next({items});
    this._snackBar.open('1 item added to cart', 'OK', {duration: 3000});
  }

  getTotal(items: Array<CartItem>):number {
    return items.map((item) => item.price * item.quantity).reduce((prev, current) => prev + current, 0)
  }

  getItemCount(items: Array<CartItem>):number {
    return items.map((item) => item.quantity).reduce((prev, current) => prev + current, 0);
  }

  clearCart():void{
    this.cart.next({items:[]});
    this._snackBar.open('Cart is cleared', 'OK', {duration: 3000});
  }

  removeFromCart(item: CartItem, update = true): Array<CartItem> {
    // const filteredItems = this.cart.value.items.filter((item) => item.id !== item.id);
    // if(update){
    // this.cart.next({items:filteredItems});
    // this._snackBar.open('Item removed', 'OK', {duration: 3000});
    // }
    // return filteredItems;
    const filteredItems = this.cart.value.items.filter((cartItem) => cartItem.id !== item.id);
    if (update) {
      this.cart.next({ items: filteredItems });
      this._snackBar.open('Item removed', 'OK', { duration: 3000 });
    }
    return filteredItems;
  }

  removeQuantity(item: CartItem):void {
    let itemForRemoval: CartItem | undefined;
    let filteredItem = this.cart.value.items.map((cartItem) => {
      if (cartItem.id === item.id) {
        cartItem.quantity -= 1;
        if (cartItem.quantity === 0) {
          itemForRemoval = cartItem;
        }
      }
      return cartItem;
    });

    if(itemForRemoval){
      filteredItem = filteredItem.filter((cartItem) => cartItem.id !== itemForRemoval!.id);
    }
    this.cart.next({items: filteredItem});
    this._snackBar.open('1 item removed', 'OK', {duration: 3000});
  }

  setQuantity(item: CartItem, quantity: number): void {
    const items = [...this.cart.value.items];
    const itemInCart = items.find((_item) => _item.id === item.id);

    if (itemInCart) {
      itemInCart.quantity = quantity;
      this.cart.next({ items });
      this._snackBar.open('Quantity has been updated', 'OK', { duration: 3000 });
    } else {
      console.error('Item not found in cart');
    }
  }

  addToWishList(item: { product: string; price: number; quantity:number; name: string; id: number }) {
    const items = [...this.wishlist.value.items];
    const itemInWishList = items.find((_item) => _item.id === item.id);

    if (itemInWishList) {
      this._snackBar.open('Item is already in Wishlist', 'OK', {duration: 3000});
    } else {
      items.push(item);
      this.wishlist.next({items}); // Assuming wishlist is a BehaviorSubject
      this._snackBar.open('1 item added to wishlist', 'OK', {duration: 3000});
    }
  }

  removeFromWishList(item: CartItem, update=true):Array<CartItem> {
    const filteredItems = this.wishlist.value.items.filter((cartItem) => cartItem.id !== item.id);
    if (update) {
      this.wishlist.next({ items: filteredItems });
      this._snackBar.open('Item removed', 'OK', { duration: 3000 });
    }
    return filteredItems;
  }

  clearWishList() {
    this.wishlist.next({items:[]});
    this._snackBar.open('Cart is cleared', 'OK', {duration: 3000});
  }
}
