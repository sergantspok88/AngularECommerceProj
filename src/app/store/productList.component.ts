import { Component, OnInit } from '@angular/core';
import { Repository } from '../model/repository';
import { Product } from '../model/product.model';

@Component({
  selector: "productList",
  templateUrl: "productList.component.html"
})

export class ProductList implements OnInit{

  constructor(private repository: Repository){

  }

  ngOnInit(){}

  get products(): Product[]{
    return this.repository.getProducts();
  }

}
