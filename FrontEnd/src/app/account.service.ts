import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  registerUrl = 'http://localhost:8080/register/';
  adminUrl = 'http://localhost:8080/admin/';
  constructor(private http: HttpClient) { }
  addUser(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.registerUrl+'user', data,{headers, responseType: 'text'});
  }

  // @ts-ignore
  getAccountList(): Observable<any[]> {
    const token = localStorage.getItem('token');
    // @ts-ignore
    const formatToken = token.substring(10, token.length - 2);

    if (token) {
      console.log(formatToken);
      const headers = new HttpHeaders({'Authorization': 'Bearer ' + formatToken});
      return this.http.get<any[]>(this.adminUrl+ 'accounts', {headers});
    }
  }

  deleteAccount(id: number):Observable<any> {
    const token = localStorage.getItem('token');
    // @ts-ignore
    const formatToken = token.substring(10, token.length - 2);
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + formatToken});
    return this.http.delete(this.adminUrl+'accounts/'+id, {headers, responseType: "text"});
  }

  updateAccount(id: number, data: any): Observable<any> {
    const token = localStorage.getItem('token');
    // @ts-ignore
    const formatToken = token.substring(10, token.length - 2);
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + formatToken});
    return this.http.put(this.adminUrl+'accounts/'+id, data, {headers, responseType: 'text'});
  }
}
