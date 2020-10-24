import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreFrontComponent } from './store/store-front/store-front.component';
import { SignInComponent } from './store/sign-in/sign-in.component';
import { RegisterComponent } from './store/register/register.component';
import { WishlistComponent } from './store/wishlist/wishlist.component';
import { CartComponent } from './store/cart/cart.component';
import { AuthGuard } from './helpers/auth.guard';
import { SignInGuard } from './helpers/signin.guard';

const adminModule = () =>
  import('./admin/admin.module').then((x) => x.AdminModule);

const routes: Routes = [
  { path: '', component: StoreFrontComponent },
  { path: 'signin', component: SignInComponent, canActivate: [SignInGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [SignInGuard] },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'cart', component: CartComponent },

  { path: 'admin', loadChildren: adminModule, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
