import {Component, OnInit} from '@angular/core';
import {Cart, CartItem} from "../../models/cart.model";
import {MatCard} from "@angular/material/card";
import {CurrencyPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {
  MatCell, MatCellDef,
  MatColumnDef, MatFooterCell, MatFooterCellDef,
  MatFooterRow,
  MatFooterRowDef, MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {CartService} from "../../services/cart.service";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatInput} from "@angular/material/input";
import {StoreService} from "../../services/store.service";

@Component({
  selector: 'app-cart1',
  standalone: true,
  imports: [
    MatCard,
    NgIf,
    MatButton,
    RouterLink,
    MatTable,
    MatHeaderRow,
    MatHeaderRowDef,
    MatFooterRow,
    MatColumnDef,
    MatRowDef,
    MatFooterRowDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatFooterCell,
    MatFooterCellDef,
    CurrencyPipe,
    MatMiniFabButton,
    MatIcon,
    FormsModule,
    MatInput,
    MatFormField,
    NgOptimizedImage
  ],
  templateUrl: './cart1.component.html',
  styleUrl: './cart1.component.css'
})
export class Cart1Component implements OnInit{
  cart: Cart = {items: []}
  datasource: Array<CartItem> = [];
  displayColumns: Array<string> = ['product', 'name', 'price', 'quantity', 'total', 'action'];
  discount: number = 1;
  couponCode: number | string = '';
  quantity: number = 1;
  constructor(private cartService: CartService, private storeService: StoreService) {
  }
  ngOnInit(): void {
    this.cartService.cart.subscribe(cart => {
      this.cart = cart;
      this.datasource = this.cart.items;
    })
  }

  getTotal(items: Array<CartItem>):number {
    return this.cartService.getTotal(items);
  }
  onClearCart() {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    console.log(item);
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem):void {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem):void {
    this.cartService.removeQuantity(item);
  }

  applyCoupon() {
    // @ts-ignore
    this.discount = (100 - this.couponCode) / 100;
  }

  onSetQuantity(item: CartItem) {
    this.cartService.setQuantity(item, this.quantity);
  }

  onCheckOut(items: Array<CartItem>) {
    this.storeService.checkout(items).subscribe(
      (response) => {
        console.log('Checkout successful:', response);
      },
      (error) => {
        console.error('Checkout failed:', error);
      }
    );
  }
}
