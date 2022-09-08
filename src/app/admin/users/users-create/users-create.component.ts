import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../../shared/usersService/users.service";
import {UserCreateDto} from "../../../shared/usersService/userCreate.dto";
import {ErrorDto} from "../../../shared/error.dto";


@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.css']
})
export class UsersCreateComponent implements OnInit {
  createForm = new UntypedFormGroup({
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

  constructor(private _usersService: UsersService,private _route: ActivatedRoute, private _router : Router) { }

  ngOnInit(): void {
  }

  get firstname(){
    return this.createForm.get('firstname')
  }

  get lastname(){
    return this.createForm.get('lastname')
  }

  get email(){
    return this.createForm.get('email')
  }

  get phoneNumber(){
    return this.createForm.get('phoneNumber')
  }

  get username(){
    return this.createForm.get('username')
  }

  get password(){
    return this.createForm.get('password')
  }

  doCreate(): void{
    let user = this.createForm.value as UserCreateDto;
    this._usersService.save(user).subscribe(user => {
      this._router.navigateByUrl('/user').then(r => {});
    }, error => {
      this.formError = true;
      this.formErrorMessage = (error.error as ErrorDto).message
    });
  }
}
