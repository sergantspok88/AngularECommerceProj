import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DataSource } from './services/datasource';
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
import { ErrorInterceptor } from './helpers/error.interceptor';
import { WishlistComponent } from './store/wishlist/wishlist.component';
import { CartComponent } from './store/cart/cart.component';
import { RouterExtService } from './helpers/router.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductList,
    CategoryListComponent,
    StoreFrontComponent,
    SignInComponent,
    RegisterComponent,
    AlertComponent,
    WishlistComponent,
    CartComponent,
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
    RouterExtService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
