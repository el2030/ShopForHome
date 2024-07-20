import { Component } from '@angular/core';
import {AuthService} from "../auth.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule
  ],
  providers: [AuthService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  userName: string = '';
  password: string = '';
  email: string = '';
  constructor(private authService: AuthService) {}
  // signup(event: Event) {
  //   this.authService.signup(this.userName, this.password, this.email).subscribe(()=> console.log('User created successfully'));
  //   event.preventDefault();
  // }

}
