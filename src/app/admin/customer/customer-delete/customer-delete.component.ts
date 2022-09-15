import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CustomersService} from "../../../shared/customersService/customers.service";

@Component({
  selector: 'app-customer-delete',
  templateUrl: './customer-delete.component.html',
  styleUrls: ['./customer-delete.component.css']
})
export class CustomerDeleteComponent implements OnInit {
  private selectedId: number | undefined;

  constructor(private _route: ActivatedRoute, private _router: Router, private _customersService: CustomersService) { }

  ngOnInit(): void {
    this.selectedId = Number(this._route.snapshot.paramMap.get('id'));
    this._customersService.delete(this.selectedId).subscribe(customer => {
      this._router.navigateByUrl('/customer').then(u => {})
    });
  }

}
