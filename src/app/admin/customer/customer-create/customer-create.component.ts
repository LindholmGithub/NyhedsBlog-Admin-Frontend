import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {CustomersService} from "../../../shared/customersService/customers.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerCreateDto} from "../../../shared/customersService/customersCreate.dto";
import {ErrorDto} from "../../../shared/error.dto";

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  error: any;
  createForm = new UntypedFormGroup({
    firstname: new UntypedFormControl('', Validators.required),
    lastname: new UntypedFormControl('', Validators.required),
    address: new UntypedFormControl('', Validators.required),
    zipcode: new UntypedFormControl('', Validators.required),
    city: new UntypedFormControl('', Validators.required),
    phoneNumber: new UntypedFormControl('', Validators.required),
    email: new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl('', Validators.required),
  });
  formError: boolean = false;
  formErrorMessage: string | undefined;

  constructor(private _customersService: CustomersService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  doCreate(): void{
    let customer = this.createForm.value as CustomerCreateDto;
    customer.username = this.createForm.get('email')?.value;
    this._customersService.save(customer).subscribe(customer => {
      this._router.navigateByUrl('/customer').then(r => {});
    }, error => {
      this.formError = true;
      this.formErrorMessage = (error.error as ErrorDto).message
    });
  }

}
