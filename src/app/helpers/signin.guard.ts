import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AccountService } from '../services/account.service';

@Injectable({ providedIn: 'root' })
export class SignInGuard implements CanActivate {
  constructor(private router: Router, private accountService: AccountService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.accountService.userValue;
    if (user != null) {
      //automatically navigate to main page if already signed in
      return this.router.parseUrl('/');
    }

    return true;
  }
}
