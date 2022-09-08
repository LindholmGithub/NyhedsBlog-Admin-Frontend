import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../../shared/usersService/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserDto} from "../../../shared/usersService/user.dto";
import {ErrorDto} from "../../../shared/error.dto";

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {
  editState: boolean;

  selectedId: number | undefined;
  editForm = new UntypedFormGroup({
    id: new UntypedFormControl(''),
    firstname: new UntypedFormControl('',Validators.required),
    lastname: new UntypedFormControl('',Validators.required),
    email: new UntypedFormControl('',Validators.required),
    phoneNumber: new UntypedFormControl('',Validators.required),
    username: new UntypedFormControl('',Validators.required),
    password: new UntypedFormControl('',Validators.required),
    role: new UntypedFormControl('',Validators.required),
  });
  formError: boolean = false;
  formErrorMessage: string | undefined;

  constructor(private _usersService: UsersService, private _route: ActivatedRoute, private _router: Router) {
    this.editState = false;
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.selectedId = Number(this._route.snapshot.paramMap.get('id'));

    this._usersService.getOne(this.selectedId).subscribe(users => {
      this.editForm.patchValue(users);
    });
  }
  get firstname(){
    return this.editForm.get('firstname')
  }

  get lastname(){
    return this.editForm.get('lastname')
  }

  get email(){
    return this.editForm.get('email')
  }

  get phoneNumber(){
    return this.editForm.get('phoneNumber')
  }

  get role(){
    return this.editForm.get('role')
  }

  doEdit(): void {
    if (!this.editState) {
      this.editState = !this.editState;
      return;
    }

    let user = this.editForm.value as UserDto;

    this._usersService.update(user.id,user).subscribe(user =>{
      this.editState = !this.editState;
      this.loadUsers();
    }/**,
        error => {
      this.formError = true;
      this.formErrorMessage = (error.error as ErrorDto).message;
    }
    **/
    );
  }

  goBack(): void {
    this._router.navigateByUrl('/user').then(r => {});
  }
}
