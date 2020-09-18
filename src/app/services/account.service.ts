import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

// const PROTOCOL = 'https';
// const PORT = 5001;

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  //private baseUrl: string;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.user = this.userSubject.asObservable();
    //environment.apiUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  //!!!
  //public userName: string = 'Non authorized';

  login(username, password) {
    return this.http
      .post<User>(environment.apiUrl + '/api/users/authenticate', {
        username,
        password,
      })
      .pipe(
        map((user) => {
          //store user details and jwt token in local storage
          //and to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);

          //!!!!
          //this.userName = user.username;

          return user;
        })
      );
  }

  logout() {
    console.log('logout');
    //remove user from local storage and set currentuser to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    //!!!
    //this.userName = 'Non authorized';
    //this.router.navigate(['/account/login']);
  }

  register(user: User) {
    return this.http.post(environment.apiUrl + '/api/users/register', user);
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + '/api/users');
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(environment.apiUrl + `/api/users/${id}`);
  }

  //update
  //delete
}
