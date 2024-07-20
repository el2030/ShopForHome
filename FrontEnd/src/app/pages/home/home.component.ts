import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {ProductsHeaderComponent} from "./components/products-header/products-header.component";
import {FiltersComponent} from "./components/filters/filters.component";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {ProductBoxComponent} from "./components/product-box/product-box.component";
import {CartService} from "../../services/cart.service";
import {Product} from "../../models/product.model";
import {Subscription} from "rxjs";
import {StoreService} from "../../services/store.service";
import {NgForOf} from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

const ROWS_HEIGHT: {[id:number]: number} = {1: 400, 3: 335, 4: 350}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatDrawerContainer,
    MatDrawer,
    ProductsHeaderComponent,
    MatDrawerContent,
    FiltersComponent,
    MatGridList,
    MatGridTile,
    ProductBoxComponent,
    NgForOf,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy{
  cols = 3;
  category: string | undefined;
  rowHeight = ROWS_HEIGHT[this.cols];
  products: Array<Product> | undefined;
  sort = 'desc';
  count = '10';
  productSubscription: Subscription | undefined;
  constructor(private cartService: CartService, private storeService: StoreService) {
  }
  onColumnsCountChange(colsNum: number):void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(selectedCategory: string): void {
    this.category = selectedCategory;
    this.getProducts();
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.name,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  ngOnInit(): void {
    this.category = 'ALL';
    this.getProducts();
  }

  getProducts(): void {
    this.productSubscription = this.storeService.getAllProducts(this.count, this.sort, this.category).subscribe((products) => {
      this.products = products;
    })
  }

  ngOnDestroy(): void {
    if(this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

  onItemsCountChange(count: number):void {
    this.count = count.toString();
    this.getProducts();
  }

  onSortChange(sort: string):void {
    this.sort = sort;
    this.getProducts();
  }

  onAddToWishList(product: Product):void {
    this.cartService.addToWishList({
      product: product.image,
      name: product.name,
      price: product.price,
      quantity: 1,
      id: product.id
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (filterValue === '') {
      this.getProducts();
    } else {
      // @ts-ignore
      this.products = this.products.filter(product => {
        return product.name.toLowerCase().includes(filterValue);
      });
    }
  }

}
