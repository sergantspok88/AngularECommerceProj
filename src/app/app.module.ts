import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DataSource } from './model/datasource';
import { Repository } from './model/repository';
import { ProductList } from './store/product-list/productList.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryListComponent } from './store/category-list/category-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductList,
    CategoryListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [DataSource, Repository],
  bootstrap: [AppComponent]
})
export class AppModule { }
