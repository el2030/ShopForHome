import {Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from "@angular/material/expansion";
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {NgFor, NgIf} from "@angular/common";
import {StoreService} from "../../../../services/store.service";
import {Subscription} from "rxjs";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatSelectionList,
    MatListOption,
    MatExpansionPanelHeader,
    NgIf,
    NgFor,
    MatButton
  ],
  templateUrl: './filters.component.html',
})
export class FiltersComponent implements OnInit, OnDestroy{
  @Output() showCategory = new EventEmitter<string>();
  categories: Array<string> | undefined;
  categorySubscription: Subscription | undefined;
  count: number = 0;

  constructor(private storeService: StoreService,) {
  }
  onShowCategory(category: string): void {
      this.showCategory.emit(category);
      console.log(this.count++);

  }

  ngOnInit(): void {
    this.categorySubscription = this.storeService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    })
  }

  ngOnDestroy(): void {
    if(this.categorySubscription){
      this.categorySubscription.unsubscribe();
    }
  }

  onShowAll() {
    this.showCategory.emit('ALL');
  }




}

