import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DataSource } from './model/datasource';
import { Repository } from './model/repository';
import { ProductList } from './store/productList.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ProductList
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [DataSource, Repository],
  bootstrap: [AppComponent]
})
export class AppModule { }
