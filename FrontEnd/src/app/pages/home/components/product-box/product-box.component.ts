import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {CurrencyPipe, NgClass, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {Product} from "../../../../models/product.model";

@Component({
  selector: 'app-product-box',
  standalone: true,
  imports: [
    MatCard,
    CurrencyPipe,
    MatIcon,
    NgClass,
    NgIf
  ],
  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.css'
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
  // product: Product | undefined = {
  //   id: 1,
  //   title: 'ItemTitle',
  //   price: 100,
  //   category: 'electronics',
  //   description: 'Test',
  //   image: 'https://via.placeholder.com/150'
  // }
  @Output() addToCart = new EventEmitter();
  @Output() addToWishList = new EventEmitter();
  @Input() product: Product | undefined;
  onAddToCart():void {
    this.addToCart.emit(this.product);
  }

  onAddToWishList() {
    this.addToWishList.emit(this.product);
  }
}
