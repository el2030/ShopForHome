import {Component, OnInit} from '@angular/core';
import {MatList, MatListItem} from "@angular/material/list";
import {ProductBoxComponent} from "../home/components/product-box/product-box.component";
import {Product} from "../../models/product.model";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {MatCard} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatFooterCell, MatFooterCellDef,
  MatFooterRow,
  MatFooterRowDef,
  MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRowDef, MatTable
} from "@angular/material/table";
import {MatFormField} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {Cart, CartItem, Wishlist} from "../../models/cart.model";
import {StoreService} from "../../services/store.service";
import {CartService} from "../../services/cart.service";


@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [
    MatListItem,
    MatList,
    ProductBoxComponent,
    NgForOf,
    CurrencyPipe,
    FormsModule,
    MatButton,
    MatCard,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFooterCell,
    MatFooterRow,
    MatFooterRowDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatInput,
    MatMiniFabButton,
    MatRowDef,
    MatTable,
    NgIf,
    RouterLink,
    MatHeaderCellDef,
    MatFooterCellDef
  ],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit{
  wishlist: Wishlist = {items: []}
  datasource: Array<CartItem> = [];
  displayColumns: Array<string> = ['product', 'name', 'price', 'action'];

  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.wishlist.subscribe(wishlist => {
      this.wishlist = wishlist;
      this.datasource = this.wishlist.items;
    })
  }


  onRemoveFromWishList(item: CartItem):void {
    this.cartService.removeFromWishList(item);
  }

  onClearWishList():void {
    this.cartService.clearWishList();
  }
}
