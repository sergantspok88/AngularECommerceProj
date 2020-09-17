import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DataSource } from './services/datasource';
import { Repository } from './services/repository';
import { ProductList } from './store/product-list/productList.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CategoryListComponent } from './store/category-list/category-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { StoreFrontComponent } from './store/store-front/store-front.component';
import { SignInComponent } from './store/sign-in/sign-in.component';
import { RegisterComponent } from './store/register/register.component';
import { AlertComponent } from './alert/alert.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ProductList,
    CategoryListComponent,
    StoreFrontComponent,
    SignInComponent,
    RegisterComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    DataSource,
    Repository,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
