import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/services/alert.service';

import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let formBuilder: FormBuilder;
  let route: ActivatedRoute;
  let router: Router;
  let accountService: AccountService;
  let alertService: AlertService;

  beforeEach(() => {
    formBuilder = new FormBuilder();
    route = new ActivatedRoute();
    router = jasmine.createSpyObj('Router', ['parseUrl']);
    accountService = jasmine.createSpyObj('AccountService', ['someMethod']);
    alertService = new AlertService();

    component = new SignInComponent(
      formBuilder,
      route,
      router,
      accountService,
      alertService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
