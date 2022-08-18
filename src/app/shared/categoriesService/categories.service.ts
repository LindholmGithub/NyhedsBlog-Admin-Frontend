import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {CategoryDto} from "./categories.dto";
import {CategoryCreateDto} from "./categoriesCreate.dto";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _http: HttpClient) { }

  getAll(): Observable<CategoryDto[]>{
    return this._http.get<CategoryDto[]>(environment.api + '/api/category');
  }

  getOne(id: number): Observable<CategoryDto>{
    return this._http.get<CategoryDto>(environment.api + '/api/category/'+ id);
  }

  save(category: CategoryCreateDto): Observable<CategoryDto>{
    return this._http.post<CategoryDto>(environment.api + '/api/category', category);
  }

  delete(id: number): Observable<CategoryDto>{
    return this._http.delete<CategoryDto>(environment.api + '/api/category/' + id);
  }

  update(id: number, category: CategoryDto): Observable<CategoryDto> {
    return this._http.put<CategoryDto>(environment.api + '/api/category/' + id, category)
  }

}
