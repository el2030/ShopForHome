import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SofasComponent} from "./sofas/sofas.component";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private logInUrl = "http://localhost:8080/auth/login";
  private signUpUrl = "http://localhost:8080/register/";
  private adminUrl = "http://localhost:8080/admin";

  constructor(private http: HttpClient) {}
  getToken(): string | null{
    return localStorage.getItem('token');
  }

  login(username: string, password: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(username + ':' + password)
    });

    return this.http.post(this.logInUrl, {}, {headers, responseType: 'text'});
  }
  signup(username: string, password: string, email: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = {username: username, password: password, email: email};
    return this.http.post(this.signUpUrl + 'user', body, {headers, responseType: 'text'});
  }

  createAccount(username: string, password: string, email: string, role: string) {
    const token = localStorage.getItem('token');
    // @ts-ignore
    const formatToken = token.substring(10, token.length - 2);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + formatToken
    })
    const body = {username: username, password: password, email: email, role: role};
    return this.http.post(this.signUpUrl + 'admin', body, {headers, responseType: 'text'});
  }


}
