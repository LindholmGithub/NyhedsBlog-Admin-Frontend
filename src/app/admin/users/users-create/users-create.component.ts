import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
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
  createForm = new FormGroup({
    firstname: new FormControl('',Validators.required),
    lastname: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    phoneNumber: new FormControl('',Validators.required),
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    role: new FormControl('',Validators.required),
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
