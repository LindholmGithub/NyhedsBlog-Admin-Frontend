import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, take, tap} from "rxjs";
import {UserDto} from "../usersService/user.dto";
import {HttpClient} from "@angular/common/http";
import {UsersService} from "../usersService/users.service";
import {Router} from "@angular/router";
import {LoginDto} from "./login.dto";
import {TokenDto} from "./TokenDto";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<string | null>(this.getToken());
  currentProfile: UserDto | undefined;

  constructor(private _http: HttpClient, private _users: UsersService, private _router : Router) { }

  login(data: LoginDto): Observable<TokenDto> {
    return this._http
      .post<TokenDto>(environment.api + '/api/auth/admin', data)
      .pipe(
        tap(token => {
          if(token && token.status == 200) {
            localStorage.setItem('base64_token', token.message);
            localStorage.setItem('userId', String(token.userId));

            this._users.getOne(token.userId).subscribe(obj => {
              this.currentProfile = obj;
            });

            this.isLoggedIn$.next(token.message);
          }
        })
      );
  }

  validate(): void {
    this._http.post<TokenDto>(environment.api + '/api/auth/admin/validate', [], {
      headers: {
        'Authorization': 'Basic ' + this.getToken()
      }
    }).subscribe(token => {
      if(!(token && token.status == 200)) {
        this.logout();
        this._router.navigateByUrl('');
      }
    }, error => {
      this.logout();
      this._router.navigateByUrl('');
    });
  }

  getToken(): string | null {
    return localStorage.getItem('base64_token');
  }

  logout(): Observable<boolean> {
    localStorage.removeItem('base64_token');
    localStorage.removeItem('userId');
    this.isLoggedIn$.next(null);

    this.currentProfile = undefined;

    return of(true).pipe(take(1));
  }

  getUser(): Observable<UserDto> {
    // @ts-ignore
    return this._users.getOne(parseInt(localStorage.getItem('userId')));
  }

}
