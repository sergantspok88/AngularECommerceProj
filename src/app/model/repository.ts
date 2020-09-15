import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { DataSource } from './datasource';
import { Category } from './category.model';


@Injectable()
export class Repository{

  private products: Product[] = [];
  private categories: Category[] = [];

  constructor(private dataSource: DataSource){
    // dataSource.getProducts().subscribe(
    //   data => {
    //     this.products = data;
    //   }
    // )

    // dataSource.getCategories().subscribe(
    //   data => {
    //     this.categories = data;
    //   }
    // )
  }



  getProducts():Product[]{
    return this.products;
  }

  getCategories():Category[]{
    return this.categories;
  }

}
