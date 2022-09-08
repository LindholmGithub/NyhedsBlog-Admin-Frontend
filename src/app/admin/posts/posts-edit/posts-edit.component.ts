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

@Component({
  selector: 'app-posts-edit',
  templateUrl: './posts-edit.component.html',
  styleUrls: ['./posts-edit.component.css']
})
export class PostsEditComponent implements OnInit {
  editState: boolean;

  categories$: Observable<CategoryDto[]> | undefined;
  error: any;

  selectedId: number | undefined;

  editForm = new UntypedFormGroup({
    id: new UntypedFormControl(''),
    title: new UntypedFormControl('',Validators.required),
    categoryId: new UntypedFormControl('',Validators.required),
    prettyDescriptor: new UntypedFormControl('',Validators.required),
    featuredImageUrl: new UntypedFormControl('',Validators.required),
    requiredSubscription: new UntypedFormControl('', Validators.required),
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
  }

  ngOnInit(): void {
    this.loadPosts();

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
      this.editorConfig.editable = this.editState;
      return;
    }
    let post = this.editForm.value as PostDto;
    this._postsService.update(post.id, post).subscribe(post =>{
      this.editState = !this.editState;
      this.editorConfig.editable = this.editState;
      this.loadPosts();
    })
  }

  goBack(): void {
    this._router.navigateByUrl('/post').then(r => {})
  }

  editorConfig: AngularEditorConfig = {};

  cancel() {
    this.loadPosts();
    this.editState = !this.editState;
    this.editorConfig.editable = this.editState;
  }
}
