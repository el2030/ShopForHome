import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-adminform',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
  ],
  providers: [AuthService],
  templateUrl: './adminform.component.html',
  styleUrl: './adminform.component.css'
})
export class AdminformComponent {
  id: number = 0;
  userName: string = '';
  password: string = '';
  email: string = '';
  role: string = '';
  constructor(private authService: AuthService) {
  }

  submitCreate() {
    this.authService.createAccount(this.userName, this.password, this.email, this.role).subscribe(()=> console.log('User created successfully'));
  }
}
