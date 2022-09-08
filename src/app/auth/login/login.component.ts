import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/authService/auth.service";
import {Router} from "@angular/router";
import {LoginDto} from "../../shared/authService/login.dto";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new UntypedFormGroup({
    username: new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl('', Validators.required)
  });

  formError: boolean = false;
  formErrorMessage: string | undefined;

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  login() {
    const loginDto = this.loginForm.value as LoginDto;
    console.log(loginDto);
    this._auth.login(loginDto)
      .subscribe(token => {
        if(token && token.status == 200) {
          this._router.navigateByUrl('/');
        }
      }, error => {
        this.formError = true;
        this.formErrorMessage = "Forkert brugernavn og/eller adgangskode!";
      });
  }
}
