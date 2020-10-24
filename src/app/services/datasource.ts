import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { Product } from '../model/product.model';
import { Category } from '../model/category.model';
import { environment } from 'src/environments/environment';
import { Wishlist } from '../model/wishlist.model';
import { AccountService } from './account.service';
import { catchError, map, tap } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { CartItem } from '../model/cart.model';
import { apiroutes } from '../helpers/apiroutes';

@Injectable()
export class DataSource {
  public products: Product[] = [];
  public categories: Category[] = [];
  public wishlists: Wishlist[] = [];
  public cartItems: CartItem[] = [];

  private chosenCategoryName: string = '';
  private takeNumber: number = 10;

  //use this to subscribe for adding products event
  public productAddSubject: BehaviorSubject<Product>;
  public productIdEdit: number;

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
    this.productAddSubject = new BehaviorSubject<Product>(null);

    this.loadMoreProducts();
    this.loadCategories();
    this.loadWishlists();

    this.loadCartItems();

    //wishlists logic on user login/logout
    this.accountService.user.subscribe((data) => {
      if (data) {
        this.loadWishlists();
      } else {
        //clear wishlist if logged out
        this.wishlists.length = 0;
      }
    });

    //cartItems logic on user login/logout
    this.accountService.user.subscribe((data) => {
      if (data) {
        //loggin in
        //-if already has smth in the cart
        if (this.cartItems.length > 0) {
          //-- try to add all of this to server
          //Better to add all range at once (write appropriate methon in webapi)
          //- but we`ll add them separately to test forkJoin ... for learning experience
          let addRequests: Observable<CartItem>[] = [];
          for (let cartItem of this.cartItems) {
            addRequests.push(
              this.http
                .post<CartItem>(environment.apiUrl + apiroutes.addCartItem(), {
                  ProductId: cartItem.product.id,
                  Quantity: cartItem.quantity,
                })
                .pipe(catchError((error) => of(error)))
            );
          }
          forkJoin(addRequests).subscribe(
            (allResults) => {
              console.log(allResults);
              //clear cartItems
              this.cartItems.length = 0;
              //--load from server
              this.loadCartItems();
            },
            (error) => console.log(error)
          );
        } else {
          this.loadCartItems();
        }
      } else {
        //loggin out
        //- clean cartItems
        //--even though we can add to cart non authorized
        //--when we log out - cleaning it should be kinda security feature for user
        this.cartItems.length = 0;
      }
    });
  }

  private loadCartItems() {
    if (this.accountService.userValue) {
      this.getCartItemsForUser(this.accountService.userValue.id).subscribe(
        (data) => (this.cartItems = data)
      );
    }
  }

  private getCartItemsForUser(userId): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(
      environment.apiUrl + apiroutes.getCartItemsForUser(userId)
    );
  }

  public putProductInCart(productId) {
    let alreadyInCart = this.cartItems.some((c) => c.product.id == productId);

    if (!alreadyInCart) {
      let product = this.products[
        this.products.findIndex((p) => p.id == productId)
      ];
      let cartItem = new CartItem(
        (this.cartItems.length + 1).toString(),
        product,
        (0).toString(),
        1
      );
      this.cartItems.push(cartItem);

      if (this.accountService.userValue) {
        cartItem.userId = this.accountService.userValue.id;

        this.http
          .post<CartItem>(environment.apiUrl + apiroutes.addCartItem(), {
            ProductId: cartItem.product.id,
            //UserId: cartItem.userId,
            Quantity: cartItem.quantity,
          })
          .subscribe(
            (data) => {
              cartItem.id = data.id;
            },
            (error) => {
              this.alertService.error(error);
            }
          );
      }
    }
  }

  public deleteCartItem(cartItemId) {
    this.cartItems.splice(
      this.cartItems.findIndex((c) => c.id == cartItemId),
      1
    );

    if (this.accountService.userValue) {
      this.http
        .delete(environment.apiUrl + apiroutes.deleteCartItemById(cartItemId), {
          responseType: 'text',
        })
        .subscribe((data) => {
          //console.log(JSON.stringify(data));
        });
      //console.log('Delete cartItemId: ' + cartItemId);
    }
  }

  public loadWishlists() {
    if (this.accountService.userValue) {
      this.getWishlistsForUser(this.accountService.userValue.id).subscribe(
        (data) => (this.wishlists = data)
      );
    }
  }

  private getWishlistsForUser(userId): Observable<Wishlist[]> {
    return this.http.get<Wishlist[]>(
      environment.apiUrl + apiroutes.getWishlistItemsForUser(userId)
    );
  }

  public deleteWishlist(wishlistId) {
    if (this.accountService.userValue) {
      this.http
        .delete(
          environment.apiUrl + apiroutes.deleteWishlistItemById(wishlistId),
          {
            responseType: 'text',
          }
        )
        .subscribe(
          (data) => {
            //console.log(JSON.stringify(data));
            this.wishlists.splice(
              this.wishlists.findIndex((w) => w.id == wishlistId),
              1
            );
          },
          (error) => {
            this.alertService.error(error);
          }
        );
      //console.log('Delete wishlistItemId: ' + wishlistId);
    }
  }

  public addToWishlist(productId) {
    if (this.accountService.userValue) {
      //check first if it is not already in wishlist
      let indexOfWishlist = this.wishlists.findIndex(
        (w) => w.product.id == productId
      );
      this.http
        .post<Wishlist>(environment.apiUrl + apiroutes.addWishlistItem(), {
          productId,
        })
        .subscribe((data) => {
          //can do smth here
          this.wishlists.push(data);
        });
    }
  }

  //Products--------------------------

  public addProduct(product: Product) {
    this.http
      .post<Product>(environment.apiUrl + apiroutes.addProduct(), product)
      .subscribe(
        (data) => {
          //this.products.push(data);
          this.productAddSubject.next(data);
          this.alertService.success(`Product ${data.name} successfully added`);
        },
        (error) => {
          this.alertService.error(error);
        }
      );
  }

  public editProduct(product: Product) {
    this.http
      .put<Product>(
        environment.apiUrl + apiroutes.editProductById(product.id),
        product
      )
      .subscribe(
        (data) => {
          //this.products.push(data);
          //can affect already loaded products
          let ind = this.products.findIndex((p) => p.id == product.id);
          if (ind >= 0) {
            this.products[ind] = product;
          }

          this.alertService.success(
            `Product ${product.name} successfully edited`
          );
        },
        (error) => {
          this.alertService.error(error);
        }
      );
  }

  public setTakeNumber(take: number) {
    if (take != this.takeNumber) {
      this.takeNumber = take;
      //clear products
      this.products.length = 0;
      this.loadMoreProducts();
    }
  }

  public loadMoreProducts() {
    if (this.chosenCategoryName) {
      this.getProductsCategorySkipTake(
        this.chosenCategoryName,
        this.products.length,
        this.takeNumber
      ).subscribe((data) => {
        this.products = this.products.concat(data);
      });
    } else {
      //console.log('skip: ' + this.products.length);
      //console.log('take: ' + this.takeNumber);
      this.getProductsSkipTake(this.products.length, this.takeNumber).subscribe(
        (data) => {
          this.products = this.products.concat(data);
          //this.products = data;
          // console.log('products.length: ' + this.products.length);
          // console.log('products: ' + JSON.stringify(this.products));
        }
      );
    }
  }

  public searchProducts(nameLike: string, take: number): Observable<Product[]> {
    //let take = 5;
    if (nameLike) {
      return this.http.get<Product[]>(
        environment.apiUrl + apiroutes.getProductsNameLikeTake(nameLike, take)
      );
    } else {
      return of([]);
    }
  }

  public deleteProduct(productId) {
    if (
      this.accountService.userValue &&
      this.accountService.userValue.role == 'Admin'
    ) {
      this.http
        .delete(environment.apiUrl + apiroutes.deleteProductById(productId), {
          responseType: 'json',
        })
        .subscribe(
          (data) => {
            //console.log(JSON.stringify(data));
            this.products.splice(
              this.products.findIndex((p) => p.id == productId),
              1
            );
          },
          (error) => {
            //this.alertService.error(error);
            this.alertService.error(error);
          }
        );
      //console.log('Delete productId: ' + productId);
    }
  }

  private getProductsCategorySkipTake(
    categoryName: string,
    skip: number,
    take: number
  ): Observable<Product[]> {
    return this.http.get<Product[]>(
      environment.apiUrl +
        apiroutes.getProductsByCategoryNameSkipTake(categoryName, skip, take)
    );
  }

  private getProductsSkipTake(
    skip: number,
    take: number
  ): Observable<Product[]> {
    return this.http.get<Product[]>(
      environment.apiUrl + apiroutes.getProductsSkipTake(skip, take)
    );
  }

  private getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(
      environment.apiUrl + apiroutes.getProducts()
    );
  }

  //-------------Categories
  public loadCategories() {
    this.getCategories().subscribe((data) => (this.categories = data));
  }

  private getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(
      environment.apiUrl + apiroutes.getCategories()
    );
  }

  public getChosenCategoryName(): string {
    return this.chosenCategoryName;
  }

  public setChosenCategory(categoryName: string) {
    if (categoryName != this.chosenCategoryName) {
      this.chosenCategoryName = categoryName;
      //clear products
      this.products.length = 0;
      this.loadMoreProducts();
    }
  }
}
