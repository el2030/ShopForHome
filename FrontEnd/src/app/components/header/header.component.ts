import {Component, Input} from '@angular/core';
import {Cart} from "../../models/cart.model";
import {MatToolbar} from "@angular/material/toolbar";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatBadge} from "@angular/material/badge";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    CurrencyPipe,
    MatAnchor,
    MatButton,
    MatIcon,
    MatIconButton,
    MatMenu,
    NgForOf,
    NgIf,
    RouterLink,
    RouterOutlet,
    MatMenuTrigger,
    MatBadge
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
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


  protected readonly localStorage = localStorage;
}
