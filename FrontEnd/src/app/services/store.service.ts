import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Product} from "../models/product.model";

const productUrl = "http://localhost:8080/product";
const reportUrl = "http://localhost:8080/report";
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private httpClient: HttpClient) { }

  getAllProducts(limit = '10', sort='desc', category?:string): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(
      `${productUrl}/${
        category ? 'category/' + category : ''
      }?sort=${sort}&limit=${limit}`
    )

  }

  getAllProductsAdmin():Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(
      `${productUrl}/all`,
    )
  }

  getAllCategories(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(
      `${productUrl}/categories`,
    )
  }

  deleteProduct(id: number) {
    const token = localStorage.getItem('token');
    // @ts-ignore
    const formatToken = token.substring(10, token.length - 2);
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + formatToken});
    return this.httpClient.delete(`${productUrl}/${id}`, {headers, responseType: "text"});
  }

  updateProduct(id: number, data:any): Observable<any>{
    const token = localStorage.getItem('token');
    // @ts-ignore
    const formatToken = token.substring(10, token.length - 2);
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + formatToken});
    return this.httpClient.put(`${productUrl}/${id}`, data, {headers, responseType: 'text'});
  }

  addProduct(data:any): Observable<any> {
  const token = localStorage.getItem('token');
  // @ts-ignore
  const formatToken = token.substring(10, token.length - 2);
  const headers = new HttpHeaders({'Authorization': 'Bearer ' + formatToken});
  return this.httpClient.post(`${productUrl}`, data, {headers, responseType: 'text'});
  }

  postToAddProducts(data: any) {
    const token = localStorage.getItem('token');
    // @ts-ignore
    const formatToken = token.substring(10, token.length - 2);
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + formatToken});
    return this.httpClient.post(`${productUrl}/upload`, data, {headers, responseType: 'text'});
  }

  checkout(data: any){
    // const user = localStorage.getItem('user');
    // const dataUser = { ...data, user };
    console.log(data);
    return this.httpClient.post(`${reportUrl}`, data);

  }

  getReport(): Observable<Array<Report>> {
    const token = localStorage.getItem('token');
    // @ts-ignore
    const formatToken = token.substring(10, token.length - 2);
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + formatToken});
    return this.httpClient.get<Array<Report>>(`${reportUrl}`, {headers});
  }
}
