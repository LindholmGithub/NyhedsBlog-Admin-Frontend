import { Component, OnInit } from '@angular/core';
import {CustomersService} from "../../../shared/customersService/customers.service";
import {catchError, Observable} from "rxjs";
import {CustomerDto} from "../../../shared/customersService/customers.dto";

@Component({
  selector: 'app-customer-read',
  templateUrl: './customer-read.component.html',
  styleUrls: ['./customer-read.component.css']
})
export class CustomerReadComponent implements OnInit {
  customers$: Observable<CustomerDto[]> | undefined;
  error: any;

  constructor(private _customersService: CustomersService) { }

  ngOnInit(): void {
    this.customers$ = this._customersService.getAll()
      .pipe(
        catchError(err => {
          this.error = err;
          throw err;
        })
      )
  }

}
