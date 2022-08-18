import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostDto} from "./posts.dto";
import {environment} from "../../../environments/environment";
import {PostCreateDto} from "./postsCreate.dto";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private _http: HttpClient) { }

  getAll(): Observable<PostDto[]> {
    return this._http.get<PostDto[]>(environment.api + '/api/post');
  }

  getOne(id: number): Observable<PostDto>{
    return this._http.get<PostDto>(environment.api + '/api/post/'+ id);
  }

  save(post: PostCreateDto): Observable<PostDto>{
    return this._http.post<PostDto>(environment.api + '/api/post', post);
  }

  delete(id: number): Observable<PostDto>{
    return this._http.delete<PostDto>(environment.api + '/api/post/' + id);
  }

  update(id: number, post: PostDto): Observable<PostDto>{
    return this._http.put<PostDto>(environment.api + '/api/post' + id, post)
  }

}
