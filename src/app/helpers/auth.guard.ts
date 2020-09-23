import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private accountService: AccountService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.accountService.userValue;
    if (user && user.role == 'Admin') {
      //authorized as admin
      return true;
    }

    if (!user) {
      //not logged in so redirect to signin page with return url
      this.router.navigate(['/signin'], {
        queryParams: { returnUrl: state.url },
      });
    }

    return false;
  }
}
