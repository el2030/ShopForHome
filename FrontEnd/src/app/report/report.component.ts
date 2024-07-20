import {Component, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {StoreService} from "../services/store.service";
import {AddeditformComponent} from "../addeditform/addeditform.component";
import {ProductformComponent} from "../productform/productform.component";
import {last} from "rxjs";
import {CurrencyPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatSort,
    MatTable,
    MatHeaderCellDef,
    MatNoDataRow,
    NgForOf,
    CurrencyPipe
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit{
  displayedColumns: string[] = ['id', 'date', 'product','quantity'];
  dataSource!: MatTableDataSource<any>;
  products!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private storeService: StoreService) {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.getReport();
  }


  // openEditForm(data: any){
  //   this.dialog.open(ProductformComponent, {
  //     data,
  //   })
  // }

  getReport(){
    this.storeService.getReport().subscribe({
      next: (data) => {
        // @ts-ignore
        const products = data[0].products;
        console.log(products);
        this.products =products;

        // @ts-ignore
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  getTotalPrice(products: any[]): number {
    return products.reduce((total, product) => total + (product.price * product.quantity), 0);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  protected readonly last = last;
}
