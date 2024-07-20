import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private http: HttpClient) { }

  logOut() {
    this.http.get('http://localhost:8080/logout', {})
      localStorage.removeItem('token');
      localStorage.setItem('username', 'no')
      localStorage.setItem('role', 'guest')
  }
}
