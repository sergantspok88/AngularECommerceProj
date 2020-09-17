import { Component, OnInit } from '@angular/core';
import { Repository } from '../../services/repository';
import { Product } from '../../model/product.model';
import { DataSource } from 'src/app/services/datasource';
import { Observable, Subject } from 'rxjs';

import{ debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'productList',
  templateUrl: 'productList.component.html',
})

export class ProductList implements OnInit {
  searchProducts$: Observable<Product[]>;
  private searchTerms = new Subject<string>();
  searchText:string = '';

  constructor(
    //private repository: Repository
    private datasource: DataSource
  ) {}

  //Push a search term into the observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  clearSearchField():void{
    this.searchText = "";
    this.search(this.searchText);
  }

  ngOnInit() {
    this.searchProducts$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(700),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.datasource.searchProducts(term))
    );
  }

  searchItemClicked(productName:string){
    alert(`Not Implemented. Clicked search product: ${productName}`);
  }

  get products(): Product[] {
    //return this.repository.getProducts();
    return this.datasource.products;
  }

  loadMoreProducts() {
    this.datasource.loadMoreProducts();
  }

  // search(searchValue){
  //   console.log("search called: " + searchValue);
  // }
}
