import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {catchError, Observable} from "rxjs";
import {PostDto} from "../../../shared/postsService/posts.dto";
import {PostsService} from "../../../shared/postsService/posts.service";
import {CategoriesService} from "../../../shared/categoriesService/categories.service";
import {CategoryDto} from "../../../shared/categoriesService/categories.dto";
import {PostsHeaderSort, compare, SortEvent} from "./postsHeaderSort.directive";

@Component({
  selector: 'app-posts-read',
  templateUrl: './posts-read.component.html',
  styleUrls: ['./posts-read.component.css']
})
export class PostsReadComponent implements OnInit {
  filter!: string;
  data!: Array<PostSortingModel>;
  postsArray: Array<PostSortingModel> = new Array<PostSortingModel>();

  posts$: Observable<PostDto[]> | undefined;
  error: any;

  @ViewChildren(PostsHeaderSort)
  headers!: QueryList<PostsHeaderSort>;

  constructor(private _postService: PostsService, private _categoryService: CategoriesService) { }

  ngOnInit(): void {
    this._postService.getAll()
      .subscribe(data => {
        data.forEach(obj => {
          let newPost = {
            id: obj.id,
            categoryName: obj.category.title,
            title: obj.title,
            prettyDescriptor: obj.prettyDescriptor,
            authorName: obj.author.firstname + " " + obj.author.lastname,
            date: obj.date,
            paid: obj.paid
          } as PostSortingModel
          this.postsArray!.push(newPost)
        })
      })
    this.posts$ = this._postService.getAll()
      .pipe(
        catchError(err => {
          this.error = err;
          throw err;
        })
      )
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '' || column === '') {

      this.postsArray! = this.data;

    } else {
      this.postsArray! = [...this.data].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
}
export interface PostSortingModel {
  id: number;
  categoryName: string;
  title: string;
  prettyDescriptor: string;
  authorName: string;
  date: Date;
  paid: boolean;
}
