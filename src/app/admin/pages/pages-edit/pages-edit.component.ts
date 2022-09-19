import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {PagesService} from "../../../shared/pagesService/pages.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PostDto} from "../../../shared/postsService/posts.dto";
import {PageDto} from "../../../shared/pagesService/pages.dto";
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {Editor, Toolbar} from "ngx-editor";

@Component({
  selector: 'app-pages-edit',
  templateUrl: './pages-edit.component.html',
  styleUrls: ['./pages-edit.component.css']
})
export class PagesEditComponent implements OnInit {
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
  error: any;

  selectedId: number | undefined;

  editForm = new UntypedFormGroup({
    id: new UntypedFormControl(''),
    title: new UntypedFormControl('',Validators.required),
    prettyDescriptor: new UntypedFormControl('',Validators.required),
    content: new UntypedFormControl('', Validators.required),
    authorId: new UntypedFormControl('1')
  });
  formError: boolean = false;
  formErrorMessage: string | undefined;

  constructor(private _pagesService: PagesService,
              private _router: Router,
              private _route: ActivatedRoute) {
    this.editState = false;
    this.editor = new Editor();
  }

  ngOnInit(): void {
    this.loadPages();
    this.editForm.get('content')?.disable();
  }

  loadPages(): void {
    this.selectedId = Number(this._route.snapshot.paramMap.get('id'));
    this._pagesService.getOne(this.selectedId).subscribe(pages => {
      this.editForm.patchValue(pages);
      this.editForm.patchValue({
        authorId: pages.author.id
      });
    });
  }
  get title(){
    return this.editForm.get('title')
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
    let page = this.editForm.value as PageDto;
    this._pagesService.update(page.id, page).subscribe(page =>{
      this.editState = !this.editState;
      this.editForm.get('content')?.disable();
      this.loadPages();
    })
  }

  goBack(): void {
    this._router.navigateByUrl('/page').then(r => {})
  }

  editorConfig: AngularEditorConfig = {};

  cancel() {
    this.loadPages();
    this.editState = !this.editState;
    this.editForm.get('content')?.disable();
  }

}
