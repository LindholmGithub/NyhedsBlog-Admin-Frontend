import { Component } from '@angular/core';
import {UserDto} from "./shared/usersService/user.dto";
import {AuthService} from "./shared/authService/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Status 1 Admin';

  base64: string | null | undefined;

  userProfile$: Observable<UserDto> | undefined;

  constructor(private _auth: AuthService) {
    _auth.isLoggedIn$.subscribe(token => {
      this.base64 = token;

      if(token) {
        this.userProfile$ = _auth.getUser();
      }
    })
  }
}
