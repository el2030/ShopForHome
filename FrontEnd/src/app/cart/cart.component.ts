import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  constructor(private http: HttpClient) { }
  products: any[] = [];
  showCart() {
    const token = localStorage.getItem('token');
    // @ts-ignore
    const formatToken = token.substring(10, token.length - 2);
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + formatToken});
    if (token) {
      console.log(formatToken);
      const headers = new HttpHeaders({'Authorization': 'Bearer ' + formatToken});
      this.http.get<any[]>('http://localhost:8080/cart/'+localStorage.getItem('username'), {headers}).subscribe((products) => this.products = products);
    }
  }
}
