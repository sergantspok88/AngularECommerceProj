import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product} from './product.model';
import { Category } from './category.model';

const PROTOCOL = 'https';
const PORT = 5001;

@Injectable()
export class DataSource {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  public getProducts(): Observable<Product[]> {
    //return this.http.get<Product[]>(this.baseUrl + 'api/products');
    return this.http.get<Product[]>(this.baseUrl + 'api/products/20/10');
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + 'api/categories');
  }
}
