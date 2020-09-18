import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, VirtualTimeScheduler } from 'rxjs';
import { Product } from '../model/product.model';
import { Category } from '../model/category.model';
import { environment } from 'src/environments/environment';

//const PROTOCOL = 'https';
//const PORT = 5001;

@Injectable()
export class DataSource {
  //baseUrl: string;

  public products: Product[] = [];
  public categories: Category[] = [];

  private chosenCategoryName: string = '';
  private takeNumber: number = 10;

  constructor(private http: HttpClient) {
    //this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;

    //console.log('products.length: ' + this.products.length);
    this.loadMoreProducts();
    this.loadCategories();
  }

  public loadCategories() {
    this.getCategories().subscribe((data) => (this.categories = data));
  }

  public setTakeNumber(take: number) {
    if (take != this.takeNumber) {
      this.takeNumber = take;
      //clear products
      this.products.length = 0;
      this.loadMoreProducts();
    }
  }

  public getChosenCategoryName(): string {
    return this.chosenCategoryName;
  }

  public setChosenCategory(categoryName: string) {
    if (categoryName != this.chosenCategoryName) {
      this.chosenCategoryName = categoryName;
      //clear products
      this.products.length = 0;
      this.loadMoreProducts();
    }
  }

  public loadMoreProducts() {
    if (this.chosenCategoryName) {
      this.getProductsCategorySkipTake(
        this.chosenCategoryName,
        this.products.length,
        this.takeNumber
      ).subscribe((data) => {
        this.products = this.products.concat(data);
      });
    } else {
      //console.log('skip: ' + this.products.length);
      //console.log('take: ' + this.takeNumber);
      this.getProductsSkipTake(this.products.length, this.takeNumber).subscribe(
        (data) => {
          this.products = this.products.concat(data);
          //this.products = data;
          // console.log('products.length: ' + this.products.length);
          // console.log('products: ' + JSON.stringify(this.products));
        }
      );
    }
  }

  public searchProducts(nameLike: string): Observable<Product[]> {
    let take = 5;
    if(nameLike){
      return this.http.get<Product[]>(
        environment.apiUrl + `/api/products-like/${nameLike}/${take}`
      );
    } else {
      return of([]);
    }

  }

  //These methods are only used internally
  private getProductsCategorySkipTake(
    categoryName: string,
    skip: number,
    take: number
  ): Observable<Product[]> {
    return this.http.get<Product[]>(
      environment.apiUrl + `/api/products/${categoryName}/${skip}/${take}`
    );
  }

  private getProductsSkipTake(
    skip: number,
    take: number
  ): Observable<Product[]> {
    return this.http.get<Product[]>(
      environment.apiUrl + `/api/products/${skip}/${take}`
    );
  }

  private getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.apiUrl + '/api/products');
    //return this.http.get<Product[]>(this.baseUrl + 'api/products/20/10');
  }

  private getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.apiUrl + '/api/categories');
  }
}
