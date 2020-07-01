import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { DataSource } from './datasource';


@Injectable()
export class Repository{

  private products: Product[] = [];

  constructor(private dataSource: DataSource){
    dataSource.getProducts().subscribe(
      data => {
        this.products = data;
      }
    )
  }

  getProducts():Product[]{
    return this.products;
  }

}
