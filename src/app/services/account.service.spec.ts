import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../app.component';

describe('AccountService', () => {
  let service: AccountService;
  let httpTestingController: HttpTestingController;

  //let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    //routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']); // [2]

    TestBed.configureTestingModule({
      providers: [AccountService
        //Can inject Router this way, as a spy object
        //, { provide: Router, useValue: routerSpy }
      ],
      imports: [
        HttpClientTestingModule,
        //Can use this for Router injecting/testing
        RouterTestingModule.withRoutes([
          { path: '', component: AppComponent },
        ]),
      ],
    });
    service = TestBed.inject(AccountService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('test out login http call', () => {
    service.login('login', 'pass').subscribe((data) => {
      //do nothing - just testing;
    });

    const req = httpTestingController.expectOne(
      environment.apiUrl + '/api/users/authenticate'
    );
    const dummyAnswer = 'dummy answer';
    req.flush(dummyAnswer);

    expect(req.request.method).toBe('POST');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
