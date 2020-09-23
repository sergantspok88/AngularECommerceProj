import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { DataSource } from 'src/app/services/datasource';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'admin-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  constructor(
    private datasource: DataSource,
    private accountService: AccountService
  ) {}

  searchProducts$: Observable<Product[]>;
  private searchTerms = new Subject<string>();
  searchText: string = '';

  ngOnInit(): void {
        this.searchProducts$ = this.searchTerms.pipe(
          // wait XXXms after each keystroke before considering the term
          debounceTime(300),

          // ignore new term if same as previous term
          distinctUntilChanged(),

          // switch to new search observable each time the term changes
          switchMap((term: string) => this.datasource.searchProducts(term, 10))
        );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  clearSearchField() {
    this.searchText = '';
    this.search(this.searchText);
  }

  searchItemClicked(productName) {
    alert(`Not Implemented. Clicked search product: ${productName}`);
  }

  isAdmin(): boolean {
    if (this.accountService.userValue) {
      return this.accountService.userValue.role == 'Admin';
    } else {
      return false;
    }
  }

  productDeleteClick(productId) {
    this.datasource.deleteProduct(productId);
  }

  productEditClick(productId) {
    alert('Edit productId: ' + productId + ' - Not implemented');
  }

  get products(): Product[] {
    return this.datasource.products;
  }

  loadMoreProducts() {
    this.datasource.loadMoreProducts();
  }
}
