import {Component, Inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AccountService} from "../account.service";
import {StoreService} from "../services/store.service";

@Component({
  selector: 'app-productform',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatDialogClose
  ],
  templateUrl: './productform.component.html',
  styleUrl: './productform.component.css'
})
export class ProductformComponent implements OnInit{
  productForm: FormGroup;
  constructor(private fb: FormBuilder, private storeService: StoreService, private diaglogRef: MatDialogRef<ProductformComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      description: ['',]
    })
  }

  onFormSubmit() {
    if(this.productForm.valid){
      if(this.data){
        this.storeService.updateProduct(this.data.id, this.productForm.value).subscribe({
          next: (data) => {
            alert("Product updated successfully");
            this.diaglogRef.close(true);
          },
          error: err => {
            console.log(err);
          }
        })
      } else {
        console.log(this.productForm.value);
        this.storeService.addProduct(this.productForm.value).subscribe({
          next: (val: any) => {
            alert("Product added successfully");
            this.diaglogRef.close(true);
          },
          error: err => {
            console.log(err);
          }
        })
      }
    }
  }

  ngOnInit(): void {
    this.productForm.patchValue(this.data);
  }
}
