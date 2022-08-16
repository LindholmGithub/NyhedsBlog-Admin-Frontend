import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {UserDto} from "./user.dto";
import {UserCreateDto} from "./userCreate.dto";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http: HttpClient) { }

  getAll(): Observable<UserDto[]> {
    return this._http.get<UserDto[]>(environment.api + '/api/user');
  }

  getOne(id: number): Observable<UserDto> {
    return this._http.get<UserDto>(environment.api + '/api/user/'+id);
  }

  save(user: UserCreateDto): Observable<UserDto> {
    return this._http.post<UserDto>(environment.api + '/api/user', user);
  }

  delete(id: number): Observable<UserDto> {
    return this._http.delete<UserDto>(environment.api + '/api/user/'+id);
  }

  update(id: number, user: UserCreateDto): Observable<UserDto> {
    return this._http.put<UserDto>(environment.api + '/api/user/' + id, user);
  }
}
