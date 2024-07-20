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
import {AccountService} from "../account.service";
import {MatDialog} from "@angular/material/dialog";
import {AddeditformComponent} from "../addeditform/addeditform.component";
import {StoreService} from "../services/store.service";
import {ProductformComponent} from "../productform/productform.component";

@Component({
  selector: 'app-product',
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
    MatTable,
    MatHeaderCellDef,
    MatSort,
    MatNoDataRow
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'category','price','stock', 'description','action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private storeService: StoreService) {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.getProductList();
  }

  openAddEditForm(id: number){
    const dialogRef = this.dialog.open(AddeditformComponent)
    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {
        if(result){
          this.getProductList();
        }
      }
    });
  }

  openEditForm(data: any){
    this.dialog.open(ProductformComponent, {
      data,
    })
  }

  getProductList(){
    this.storeService.getAllProductsAdmin().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  deleteProduct(id: number){
    this.storeService.deleteProduct(id).subscribe({
      next: (data) => {
        alert("User deleted successfully");
        this.getProductList();
      },
      error: err => {
        console.log(err);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
