import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageDto} from "../pagesService/pages.dto";
import {environment} from "../../../environments/environment";
import {PageCreateDto} from "../pagesService/pagesCreate.dto";
import {CustomerDto} from "./customers.dto";
import {CustomerCreateDto} from "./customersCreate.dto";

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private _http: HttpClient) { }

  getAll(): Observable<CustomerDto[]>{
    return this._http.get<CustomerDto[]>(environment.api + '/api/customer');
  }

  getOne(id: number): Observable<CustomerDto>{
    return this._http.get<CustomerDto>(environment.api + '/api/customer/'+ id);
  }

  save(customer: CustomerCreateDto): Observable<CustomerDto>{
    return this._http.post<CustomerDto>(environment.api + '/api/customer', customer);
  }

  delete(id: number): Observable<CustomerDto>{
    return this._http.delete<CustomerDto>(environment.api + '/api/customer/' + id);
  }

  update(id: number, customer: CustomerDto): Observable<CustomerDto>{
    return this._http.put<CustomerDto>(environment.api + '/api/customer/' + id, customer)
  }
}
