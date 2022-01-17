import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IAddress } from '../models/address';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  //private currentUserSource = new BehaviorSubject<IUser>(null); // observable that emit to multiple observers
  private currentUserSource = new ReplaySubject<IUser>(1);  // observable tha hold 1 user oject
  currentUser$ = this.currentUserSource.asObservable();


  constructor(private http: HttpClient, private router: Router) { }


  // getCurrentUserValue() {
  //   return this.currentUserSource.value
  // }

  /// method to be used in app route component to persit user login
  loadCurrentUser(token: string) { 
    
    if(token === null) {
      this.currentUserSource.next(null);
      return of(null);
    }
    
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`Bearer ${token}`);

    return this.http.get(this.baseUrl + 'account', {headers}).pipe(
      map((user: IUser) => {
        if(user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }

      })
    )
  }


  login(values: any) {
    return this.http.post(this.baseUrl + 'account/login', values).pipe(
      map((user: IUser) => {
        if(user) {
          localStorage.setItem('token', user.token); // store token on browser storage
          this.currentUserSource.next(user);  /// put user data from server to observable
        }
      })
    );
  }

  register(values: any) {
    return this.http.post(this.baseUrl + 'account/register', values).pipe(
      map((user: IUser) => {
        if(user) {
          localStorage.setItem('token', user.token); // store token on browser storage
          this.currentUserSource.next(user); 
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }


  checkEmailExists(email: string) {
    return this.http.get(this.baseUrl + 'account/emailexists?email='+ email);
  }

  getUserAddress() {
    return this.http.get<IAddress>(this.baseUrl + 'account/address');
  }

  updateUserAddress(address: IAddress) {
    return this.http.put<IAddress>(this.baseUrl + 'account/address', address);
  }

}
