import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/model/cart.model';
import { DataSource } from 'src/app/services/datasource';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private datasource: DataSource) {}

  ngOnInit(): void {}

  //!!!temp measure - actually need to load wishlist
  //not all products
  get carts(): CartItem[] {
    return this.datasource.cartItems;
  }

  deleteCart(cartId) {
    //alert(`Delete cartId ${cartId} - Not implemented`);
    this.datasource.deleteCartItem(cartId);
  }
}
