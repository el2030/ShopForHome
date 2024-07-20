import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-products-header',
  standalone: true,
  imports: [
    MatCard,
    MatButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatIcon
  ],
  templateUrl: './products-header.component.html',

})
export class ProductsHeaderComponent{
    @Output() columnsCountChange = new EventEmitter<number>();
    @Output() itemsCountChange = new EventEmitter<number>();
    @Output() sortChange = new EventEmitter<string>();
    sort = 'desc';
    itemShowCount = 12;

    onSortUpdated(newSort: string):void{
      this.sort = newSort;
      this.sortChange.emit(newSort);
    }

    onItemsUpdated(count:number):void{
      this.itemShowCount = count;
      this.itemsCountChange.emit(count);
    }

    onColumnsUpdated(colsNum:number):void{
      this.columnsCountChange.emit(colsNum);
    }

}
