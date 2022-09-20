import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {catchError, Observable} from "rxjs";
import {PostDto} from "../../../shared/postsService/posts.dto";
import {PostsService} from "../../../shared/postsService/posts.service";
import {CategoriesService} from "../../../shared/categoriesService/categories.service";
import {CategoryDto} from "../../../shared/categoriesService/categories.dto";
import {PostsHeaderSort, compare, SortEvent} from "./postsHeaderSort.directive";
import {UsersService} from "../../../shared/usersService/users.service";
import {UserDto} from "../../../shared/usersService/user.dto";
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts-read',
  templateUrl: './posts-read.component.html',
  styleUrls: ['./posts-read.component.css']
})
export class PostsReadComponent implements OnInit {
  filterForm = new UntypedFormGroup({
    category: new UntypedFormControl('0'),
    author: new UntypedFormControl('0'),
    paid: new UntypedFormControl('0')
  });

  filter!: string;
  data: Array<PostSortingModel> = new Array<PostSortingModel>();
  postsArray: Array<PostSortingModel> = new Array<PostSortingModel>();

  posts$: Observable<PostDto[]> | undefined;

  categories$: Observable<CategoryDto[]> | undefined;
  users$: Observable<UserDto[]> | undefined;
  error: any;

  @ViewChildren(PostsHeaderSort)
  headers!: QueryList<PostsHeaderSort>;

  constructor(private _postService: PostsService, private _categoryService: CategoriesService, private _usersService: UsersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.categories$ = this._categoryService.getAll();
    this.users$ = this._usersService.getAll();

    this._postService.getAll()
      .subscribe(data => {
        // @ts-ignore
        this.categories$.subscribe(c => {
          this.route.queryParams
            .subscribe(params => {
                let categoryId : number = params['category'];
                if(categoryId > 0) {
                  this.filterForm.controls['category'].setValue(categoryId);
                  this.doFilter();
                  this.filterForm.controls['category'].setValue(categoryId + ": " + categoryId);
                }
              }
            );
        });

        data.forEach(obj => {
          let newPost = {
            id: obj.id,
            categoryName: obj.category.title,
            categoryId: obj.category.id,
            title: obj.title,
            prettyDescriptor: obj.prettyDescriptor,
            authorName: obj.author.firstname + " " + obj.author.lastname,
            authorId: obj.author.id,
            date: obj.date,
            paid: obj.paid,
            featuredImageUrl: obj.featuredImageUrl
          } as PostSortingModel
          this.postsArray.push(newPost)
          this.data = this.postsArray;
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
      this.postsArray = this.data;
    } else {
      this.postsArray! = [...this.data].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  doFilter() {
    let categoryValue : number = this.filterForm.get('category')?.value;
    let authorValue : number = this.filterForm.get('author')?.value;
    let paidValue : number = this.filterForm.get('paid')?.value;

    let data = this.data;

    if(categoryValue > 0) {
      data = data.filter(obj => obj.categoryId == categoryValue);
    }

    if(authorValue > 0) {
      data = data.filter(obj => obj.authorId == authorValue);
    }

    if(paidValue > 0) {
      data = data.filter(obj => obj.paid == (paidValue == 1));
    }

    this.postsArray = data;
  }

  doReset() {
    this.postsArray = this.data;
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
  categoryId: number;
  authorId: number;
  featuredImageUrl: string;
}
