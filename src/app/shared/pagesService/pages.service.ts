import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {PostDto} from "../postsService/posts.dto";
import {PostCreateDto} from "../postsService/postsCreate.dto";
import {PageDto} from "./pages.dto";
import {PageCreateDto} from "./pagesCreate.dto";

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(private _http: HttpClient) { }

  getAll(): Observable<PageDto[]>{
    return this._http.get<PageDto[]>(environment.api + '/api/page');
  }

  getOne(id: number): Observable<PageDto>{
    return this._http.get<PageDto>(environment.api + '/api/page/'+ id);
  }

  save(page: PageCreateDto): Observable<PageDto>{
    return this._http.post<PageDto>(environment.api + '/api/page', page);
  }

  delete(id: number): Observable<PageDto>{
    return this._http.delete<PageDto>(environment.api + '/api/page/' + id);
  }

  update(id: number, page: PageDto): Observable<PageDto>{
    return this._http.put<PageDto>(environment.api + '/api/page/' + id, page)
  }
}
