import { Component, OnInit } from '@angular/core';
import {catchError, Observable} from "rxjs";
import {UserDto} from "../../../shared/usersService/user.dto";
import {UsersService} from "../../../shared/usersService/users.service";

@Component({
  selector: 'app-users-read',
  templateUrl: './users-read.component.html',
  styleUrls: ['./users-read.component.css']
})
export class UsersReadComponent implements OnInit {
  users$: Observable<UserDto[]> | undefined;
  error: any;

  constructor(private _usersService: UsersService) { }

  ngOnInit(): void {
    this.users$ = this._usersService.getAll()
      .pipe(
        catchError(err => {
          this.error = err;
          throw err;
        })
      );
  }

}
