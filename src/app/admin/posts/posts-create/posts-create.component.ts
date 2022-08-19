import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {catchError, Observable} from "rxjs";
import {PostDto} from "../../../shared/postsService/posts.dto";
import {CategoryDto} from "../../../shared/categoriesService/categories.dto";
import {CategoriesService} from "../../../shared/categoriesService/categories.service";
import {PostsService} from "../../../shared/postsService/posts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PostCreateDto} from "../../../shared/postsService/postsCreate.dto";
import {ErrorDto} from "../../../shared/error.dto";
import {AngularEditorConfig} from "@kolkov/angular-editor";

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})
export class PostsCreateComponent implements OnInit {

  categories$: Observable<CategoryDto[]> | undefined
  error: any;


  createForm = new FormGroup({
    title: new FormControl('',Validators.required),
    categoryId: new FormControl('',Validators.required),
    featuredImageUrl: new FormControl('',Validators.required),
    requiredSubscription: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    authorId: new FormControl('1')
  });
  formError: boolean = false;
  formErrorMessage: string | undefined;


  constructor(private _categoriesService: CategoriesService,
              private _postsService: PostsService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.categories$ = this._categoriesService.getAll()
      .pipe(
        catchError(err => {
          this.error = err;
          throw err
        })
      )
  }

  doCreate() {
    let post = this.createForm.value as PostCreateDto;
    this._postsService.save(post).subscribe(p => {
      this._router.navigateByUrl('/post').then(r => {});
    }, error => {
      this.formError = true;
      this.formErrorMessage = (error.error as ErrorDto).message
      }
    );
  }
  get title(){
    return this.createForm.get('title')
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    minHeight: "10rem",
    height: "20rem"
  };

}
