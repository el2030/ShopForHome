import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  providers: [AuthService, Router],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor(private http: HttpClient, private router: Router) {}
  users: any[] = [];
  getUsers(){
    const token = localStorage.getItem('token');
    // @ts-ignore
    const formatToken = token.substring(10, token.length - 2);

    if (token) {
      console.log(formatToken);
      const headers = new HttpHeaders({'Authorization': 'Bearer ' + formatToken});
      this.http.get<any[]>('http://localhost:8080/admin/accounts', {headers}).subscribe((users) => this.users = users);
    }
  }

  deleteUser(id: number) {
    const token = localStorage.getItem('token');
    // @ts-ignore
    const formatToken = token.substring(10, token.length - 2);
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + formatToken});
    this.http.delete('http://localhost:8080/admin/accounts/'+id, {headers}).subscribe((result) => {console.log(result);});
  }

  createAccount() {
    this.router.navigate(['/adminform']);
  }


  editUser(id: number) {
    this.router.navigate(['/adminform', {id:id}]);
  }
}
