import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

describe('AccountService', () => {
  let service: AccountService;
  let fixture: ComponentFixture<AccountService>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountService],
      imports: [HttpClientTestingModule],
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
