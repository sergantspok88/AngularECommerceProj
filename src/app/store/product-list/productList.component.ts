import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product.model';
import { DataSource } from 'src/app/services/datasource';
import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'productList',
  templateUrl: 'productList.component.html',
})
export class ProductList implements OnInit {
  searchProducts$: Observable<Product[]>;
  private searchTerms = new Subject<string>();
  searchText: string = '';

  constructor(
    private datasource: DataSource,
    private accountService: AccountService
  ) {}

  isSigned(): boolean {
    if (this.accountService.userValue) {
      return true;
    } else {
      return false;
    }
  }

  isAdmin(): boolean {
    if (this.accountService.userValue) {
      return this.accountService.userValue.role == 'Admin';
    } else {
      return false;
    }
  }

  //Push a search term into the observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  clearSearchField(): void {
    this.searchText = '';
    this.search(this.searchText);
  }

  ngOnInit() {
    this.searchProducts$ = this.searchTerms.pipe(
      // wait XXXms after each keystroke before considering the term
      debounceTime(700),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.datasource.searchProducts(term, 5))
    );
  }

  searchItemClicked(productName: string) {
    alert(`Not Implemented. Clicked search product: ${productName}`);
  }

  get products(): Product[] {
    return this.datasource.products;
  }

  loadMoreProducts() {
    this.datasource.loadMoreProducts();
  }

  wishlistClick(productId) {
    if (this.datasource.wishlists.some((w) => w.product.id == productId)) {
      //delete wishlist
      let indexOfWishlist = this.datasource.wishlists.findIndex(
        (w) => w.product.id == productId
      );
      this.datasource.deleteWishlist(
        this.datasource.wishlists[indexOfWishlist].id
      );
    } else {
      //add to wishlist
      this.datasource.addToWishlist(productId);
    }
  }

  productDeleteClick(productId) {
    this.datasource.deleteProduct(productId);
  }

  isProductInWishlist(productId): boolean {
    return this.datasource.wishlists.some((w) => w.product.id == productId);
  }

  isProductInCart(productId): boolean {
    return this.datasource.cartItems.some((c) => c.product.id == productId);
  }

  buyProductClick(productId) {
    this.datasource.putProductInCart(productId);
  }

  productCardClicked(productId, event) {
    if (event.target !== event.currentTarget) return;
    alert('Product id: ' + productId + ' - Product page not implemented');
  }
}
