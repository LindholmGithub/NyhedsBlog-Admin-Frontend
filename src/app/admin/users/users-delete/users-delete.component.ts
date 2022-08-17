import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../../shared/usersService/users.service";

@Component({
  selector: 'app-users-delete',
  templateUrl: './users-delete.component.html',
  styleUrls: ['./users-delete.component.css']
})
export class UsersDeleteComponent implements OnInit {
  private selectedId: number | undefined;

  constructor(private _route: ActivatedRoute, private _router: Router, private _usersService: UsersService) { }

  ngOnInit(): void {
    this.selectedId = Number(this._route.snapshot.paramMap.get('id'));
    this._usersService.delete(this.selectedId).subscribe(user => {
      this._router.navigateByUrl('/user').then(u => {})
    });
  }
}
