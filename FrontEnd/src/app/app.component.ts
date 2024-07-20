import {Component, Input, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {SofasComponent} from "./sofas/sofas.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {MatToolbar} from "@angular/material/toolbar";
import {MatAnchor, MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AdminformComponent} from "./adminform/adminform.component";
import {AddeditformComponent} from "./addeditform/addeditform.component";
import {MatInput, MatLabel} from "@angular/material/input";
import {MatBadge} from "@angular/material/badge";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {Cart, CartItem} from "./models/cart.model";
import {CartService} from "./services/cart.service";
import {ProductformComponent} from "./productform/productform.component";
import {StoreService} from "./services/store.service";
import {Product} from "./models/product.model";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HttpClientModule, MatToolbar, MatIconButton, MatIcon, MatAnchor, NgIf, MatButton, MatBadge, MatMenuTrigger, MatMenu, CurrencyPipe, NgForOf, MatMiniFabButton,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'FrontEnd';
  protected readonly localStorage = localStorage;
  private fileName: string | undefined;
  constructor(private dialog: MatDialog, private cartService: CartService, private storeService: StoreService) {}
  private _cart: Cart = {
    items:[]
  };
  itemsQuantity: number = 0;
  @Input()
  get cart(): Cart{
    return this._cart;
  }

  set cart(cart: Cart){
    this._cart = cart;
    this.itemsQuantity = cart.items.map((item) => item.quantity).reduce((prev, current)=> prev + current, 0);
  }
  addEditForm(){
    this.dialog.open(AddeditformComponent)
  }

  addProductForm(){
    this.dialog.open(ProductformComponent)
  }
  getUser(){
    return localStorage.getItem('username');
  }

  getTotal(items: Array<CartItem>):number {
    return this.cartService.getTotal(items);
  }

  onClearCart() {
    this.cartService.clearCart();
  }

  getItemCount(items: Array<CartItem>): number{
    return this.cartService.getItemCount(items);
  }

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart) => {
      this._cart = _cart;
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    this.storeService.postToAddProducts(formData).subscribe(
      response => {
        console.log('File uploaded successfully:', response);
      },
      error => {
        console.error('Error uploading file:', error);
      }
    );
  }


}
