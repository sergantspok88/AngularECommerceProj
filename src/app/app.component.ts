import { Route } from '@angular/compiler/src/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from './services/account.service';
import { DataSource } from './services/datasource';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ecommangular';

  constructor(
    public accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private datasource: DataSource
  ) {}

  cartItemsCount():number{
    return this.datasource.cartItems.length;
  }

  cartButtonClicked() {
    this.router.navigate(['../cart'], { relativeTo: this.route });
    // if(this.accountService.userValue){
    //   alert("Cart not implemented");
    // } else {
    //   this.router.navigate(['../signin'], { relativeTo: this.route });
    // }
  }

  wishlistButtonClicked() {
    if (!this.accountService.userValue) {
      this.router.navigate(['../signin'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../wishlist'], { relativeTo: this.route });
    }
  }
}
