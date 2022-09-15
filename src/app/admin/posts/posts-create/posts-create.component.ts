import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validator, Validators} from "@angular/forms";
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


  createForm = new UntypedFormGroup({
    title: new UntypedFormControl('',Validators.required),
    categoryId: new UntypedFormControl('',Validators.required),
    prettyDescriptor: new UntypedFormControl('',Validators.required),
    featuredImageUrl: new UntypedFormControl('',Validators.required),
    paid: new UntypedFormControl('',Validators.required),
    price: new UntypedFormControl('10'),
    content: new UntypedFormControl('', Validators.compose(
      [Validators.minLength(400), Validators.required])),
    authorId: new UntypedFormControl('1')
  });
  paidPost: boolean = false;
  formError: boolean = false;
  formErrorMessage: string | undefined;


  constructor(private _categoriesService: CategoriesService,
              private _postsService: PostsService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {

    this.createForm.get('paid')?.valueChanges.subscribe(x => {
      this.paidPost = x == "true";
      if (this.paidPost){
        this.createForm.controls['price'].setValidators(Validators.required);
      } else {
        this.createForm.get('price')?.clearValidators();
        this.createForm.get('price')?.updateValueAndValidity();
      }
    })


    this.createForm.get('title')?.valueChanges.subscribe(x => {
      this.createForm.get('prettyDescriptor')?.setValue(x.replaceAll(" ", "-").toLowerCase())
    })
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
    post.paid = this.paidPost
    if (!this.paidPost){
      post.price = 0
    }
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
