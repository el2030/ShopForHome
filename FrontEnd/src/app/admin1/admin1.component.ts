import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable, MatTableDataSource,
} from "@angular/material/table";
import {MatInput, MatLabel} from "@angular/material/input";
import {MatPaginator} from "@angular/material/paginator";
import {HttpClient} from "@angular/common/http";
import {AccountService} from "../account.service";
import {MatSort} from "@angular/material/sort";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {AddeditformComponent} from "../addeditform/addeditform.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin1',
  standalone: true,
  imports: [
    MatFormField,
    MatTable,
    MatInput,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatNoDataRow,
    MatPaginator,
    MatLabel,
    MatIcon,
    MatIconButton,
    MatSort,
  ],
  templateUrl: './admin1.component.html',
  styleUrl: './admin1.component.css'
})
export class Admin1Component implements OnInit{
  displayedColumns: string[] = ['id', 'username', 'email','role','action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private accountService: AccountService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.getAccountList();
  }

  openAddEditForm(id: number){
    const dialogRef = this.dialog.open(AddeditformComponent)
    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {
        if(result){
          this.getAccountList();
        }
      }
    });
  }

  openEditForm(data: any){
    this.dialog.open(AddeditformComponent, {
      data,
    })
  }

  getAccountList(){
    this.accountService.getAccountList().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  deleteAccount(id: number){
    this.accountService.deleteAccount(id).subscribe({
      next: (data) => {
        alert("User deleted successfully");
        this.getAccountList();
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
