// import { Component } from '@angular/core';
// import {FormsModule} from "@angular/forms";
// import {MatLabel} from "@angular/material/form-field";
// import {NgIf} from "@angular/common";
// import {AuthService} from "../auth.service";
// import jwt_decode from 'jwt-decode';
//
//
// @Component({
//   selector: 'app-login1',
//   standalone: true,
//   imports: [
//     FormsModule,
//     MatLabel,
//     NgIf
//   ],
//   templateUrl: './login1.component.html',
//   styleUrl: './login1.component.css'
// })
//
// interface JwtPayload {
//   sub: string;
//   exp: number;
//   role: string;
//
// }
//
// export class Login1Component {
//
//   protected readonly localStorage = localStorage;
//   userName: any;
//   password: any;
//   private currentUser: any;
//
//   constructor(private authService: AuthService) {
//   }
//   login() {
//     this.authService.login(this.userName, this.password).subscribe(
//         (token: string) => {
//           localStorage.setItem('token', token);
//           localStorage.setItem('username', this.userName);
//           console.log(token);
//
//           const decodedToken: JwtPayload = jwt_decode(token);
//           const role = decodedToken.role;
//           localStorage.setItem('role', role);
//
//           console.log('Role:', role);
//           this.currentUser = this.userName;
//           console.log('Successfully logged in');
//         },
//         (err: any) => {
//           console.log('Login error:', err);
//         }
//     )
//   }
// }
