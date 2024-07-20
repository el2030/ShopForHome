import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInput, MatLabel} from "@angular/material/input";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AccountService} from "../account.service";
@Component({
  selector: 'app-addeditform',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    FormsModule,
    ReactiveFormsModule,
    MatDialogClose
  ],
  templateUrl: './addeditform.component.html',
  styleUrl: './addeditform.component.css'
})
export class AddeditformComponent implements OnInit {
  accountForm: FormGroup;
  constructor(private fb: FormBuilder, private accountService: AccountService, private diaglogRef: MatDialogRef<AddeditformComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.accountForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  onFormSubmit() {
    if(this.accountForm.valid){
      if(this.data){
        this.accountService.updateAccount(this.data.id, this.accountForm.value).subscribe({
          next: (data) => {
            alert("User updated successfully");
            this.diaglogRef.close(true);
          },
          error: err => {
            console.log(err);
          }
        })
      } else {
        console.log(this.accountForm.value);
        this.accountService.addUser(this.accountForm.value).subscribe({
          next: (val: any) => {
            alert("User added successfully");
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
    this.accountForm.patchValue(this.data);
  }

}
