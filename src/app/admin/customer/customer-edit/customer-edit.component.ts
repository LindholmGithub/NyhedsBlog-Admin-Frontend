import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomersService} from "../../../shared/customersService/customers.service";
import {CustomerDto} from "../../../shared/customersService/customers.dto";
import {ErrorDto} from "../../../shared/error.dto";

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  editState: boolean;

  selectedId: number | undefined;
  editForm = new UntypedFormGroup({
    id: new UntypedFormControl(''),
    firstname: new UntypedFormControl('',Validators.required),
    lastname: new UntypedFormControl('',Validators.required),
    address: new UntypedFormControl('', Validators.required),
    zipcode: new UntypedFormControl('', Validators.required),
    city: new UntypedFormControl('', Validators.required),
    email: new UntypedFormControl('',Validators.required),
    phoneNumber: new UntypedFormControl('',Validators.required),
    username: new UntypedFormControl('',Validators.required)
  });
  formError: boolean = false;
  formErrorMessage: string | undefined;

  constructor(private _customersService: CustomersService,
              private _route: ActivatedRoute,
              private _router: Router) {
    this.editState = false;
  }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.selectedId = Number(this._route.snapshot.paramMap.get('id'));

    this._customersService.getOne(this.selectedId).subscribe(customers => {
      this.editForm.patchValue(customers);
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

  doEdit(): void {
    if (!this.editState){
      this.editState = !this.editState;
      return;
    }
    let customer = this.editForm.value as CustomerDto;
    customer.username = this.editForm.get('email')?.value;
    this._customersService.update(customer.id,customer).subscribe(customer => {
      this.editState = !this.editState;
      this.loadCustomers();
    },error => {
        this.formError = true;
        this.formErrorMessage = (error.error as ErrorDto).message;
      });
  }

  goBack(): void {
    this._router.navigateByUrl('/customer').then(r => {});
  }
}
