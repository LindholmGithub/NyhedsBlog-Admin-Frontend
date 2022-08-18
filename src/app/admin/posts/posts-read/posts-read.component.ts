import { Component, OnInit } from '@angular/core';
import {catchError, Observable} from "rxjs";
import {PostDto} from "../../../shared/postsService/posts.dto";
import {PostsService} from "../../../shared/postsService/posts.service";
import {CategoriesService} from "../../../shared/categoriesService/categories.service";
import {CategoryDto} from "../../../shared/categoriesService/categories.dto";

@Component({
  selector: 'app-posts-read',
  templateUrl: './posts-read.component.html',
  styleUrls: ['./posts-read.component.css']
})
export class PostsReadComponent implements OnInit {
  posts$: Observable<PostDto[]> | undefined;
  error: any;

  constructor(private _postService: PostsService, private _categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.posts$ = this._postService.getAll()
      .pipe(
        catchError(err => {
          this.error = err;
          throw err;
        })
      )
  }
}
