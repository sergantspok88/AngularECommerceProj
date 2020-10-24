import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { Wishlist } from 'src/app/model/wishlist.model';
import { DataSource } from 'src/app/services/datasource';

@Component({
  selector: 'wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  constructor(private datasource: DataSource) {}

  ngOnInit(): void {}

  get wishlists(): Wishlist[] {
    return this.datasource.wishlists;
  }

  deleteWishlist(wishlistId){
    this.datasource.deleteWishlist(wishlistId);
  }
}
