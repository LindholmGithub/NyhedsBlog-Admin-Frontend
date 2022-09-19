import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../../shared/authService/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this._auth.getToken();
    if(token) {
      const authReq = request.clone({
        headers: request.headers.set('Authorization', 'Basic ' + token)
      });
      return next.handle(authReq);
    }
    return next.handle(request);
  }
}
