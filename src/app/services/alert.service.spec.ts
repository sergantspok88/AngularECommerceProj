import { TestBed } from '@angular/core/testing';
import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertService],
    });

    service = TestBed.inject(AlertService);
  });

  it('test calling alert and receiving on alert', () => {
    const message: string = "alert message";
    let response: string = "";

    service.onAlert().subscribe((a) => {
      response = a.message;
    })

    service.success(message);

    expect(response).toEqual(message);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  })
});
