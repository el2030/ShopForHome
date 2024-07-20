import {Component, NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../auth.service";
import {NgIf} from "@angular/common";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {MatLabel} from "@angular/material/form-field";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    MatLabel
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService]
})

export class LoginComponent {
  currentUser: string = '';
  userName: string = '';
  password: string = '';

  constructor(private authService: AuthService) {
  }

  login() {
    this.authService.login(this.userName, this.password).subscribe((token:string)=> {
      localStorage.setItem('token', token);
      localStorage.setItem('username', this.userName);

      const formattedToken = token.substring(10, token.length - 2);
      const decodedToken = jwtDecode<JwtPayload>(formattedToken);
      const role = (decodedToken as any).role;
      localStorage.setItem('role', role);
      console.log(role);
      this.currentUser = this.userName;
      console.log('Successfully logged in');
    }, (err:any) => {console.log(err)})
  }

  protected readonly localStorage = localStorage;

}


