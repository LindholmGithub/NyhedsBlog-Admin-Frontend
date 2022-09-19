import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {PostsService} from "../../../shared/postsService/posts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryDto} from "../../../shared/categoriesService/categories.dto";
import {PostDto} from "../../../shared/postsService/posts.dto";
import {AngularEditorConfig, UploadResponse} from "@kolkov/angular-editor";
import {catchError, Observable} from "rxjs";
import {HttpEvent} from "@angular/common/http";
import {CategoriesService} from "../../../shared/categoriesService/categories.service";
import {Editor, Toolbar} from 'ngx-editor';

@Component({
  selector: 'app-posts-edit',
  templateUrl: './posts-edit.component.html',
  styleUrls: ['./posts-edit.component.css']
})
export class PostsEditComponent implements OnInit {
  editor: Editor;
  html: '' | undefined;

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  editState: boolean;

  categories$: Observable<CategoryDto[]> | undefined;
  error: any;

  paidPost: boolean = false;

  selectedId: number | undefined;

  editForm = new UntypedFormGroup({
    id: new UntypedFormControl(''),
    title: new UntypedFormControl('',Validators.required),
    categoryId: new UntypedFormControl('',Validators.required),
    prettyDescriptor: new UntypedFormControl('',Validators.required),
    featuredImageUrl: new UntypedFormControl('',Validators.required),
    paid: new UntypedFormControl('',Validators.required),
    price: new UntypedFormControl('10'),
    content: new UntypedFormControl('', Validators.required),
    authorId: new UntypedFormControl('')
  });
  formError: boolean = false;
  formErrorMessage: string | undefined;

  constructor(private _categoriesService: CategoriesService,
              private _postsService: PostsService,
              private _router: Router,
              private _route: ActivatedRoute) {
    this.editState = false;
    this.editor = new Editor();
  }

  ngOnInit(): void {
    this.loadPosts();
    this.editForm.get('paid')?.valueChanges.subscribe(x => {
      this.paidPost = x == "true";
      if (this.paidPost){
        this.editForm.controls['price'].setValidators(Validators.required);
      } else {
        this.editForm.get('price')?.clearValidators();
        this.editForm.get('price')?.updateValueAndValidity();
      }
    })
    this.editForm.get('content')?.disable();
    this.categories$ = this._categoriesService.getAll()
      .pipe(
        catchError(err => {
          this.error = err;
          throw err
        })
      )
  }

  loadPosts(): void {
    this.selectedId = Number(this._route.snapshot.paramMap.get('id'));
    this._postsService.getOne(this.selectedId).subscribe(posts => {
      this.editForm.patchValue(posts);
      this.editForm.patchValue({
        paid: posts.paid ? "true" : "false",
        authorId: posts.author.id,
        categoryId: posts.category.id
      });
    });
  }

  get title(){
    return this.editForm.get('title')
  }

  get featuredImageUrl(){
    return this.editForm.get('featuredImageUrl')
  }

  get content(){
    return this.editForm.get('content')
  }

  doEdit() {

    if (!this.editState){
      this.editState = !this.editState;
      this.editForm.get('content')?.enable();
      return;
    }
    let post = this.editForm.value as PostDto;
    post.paid = this.paidPost
    if (!this.paidPost){
      post.price = 0
    }
    this._postsService.update(post.id, post).subscribe(post =>{
      this.editState = !this.editState;
      //this.editorConfig.editable = this.editState;
      this.editForm.get('content')?.disable();
      this.loadPosts();
    })
  }

  goBack(): void {
    this._router.navigateByUrl('/post').then(r => {})
  }

  editorConfig: AngularEditorConfig = {
    minHeight: "10rem",
    height: "20rem"
  };

  cancel() {
    this.loadPosts();
    this.editState = !this.editState;
    //this.editorConfig.editable = this.editState;
    this.editForm.get('content')?.disable();

  }
}
