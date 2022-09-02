import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PagesService} from "../../../shared/pagesService/pages.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PostDto} from "../../../shared/postsService/posts.dto";
import {PageDto} from "../../../shared/pagesService/pages.dto";
import {AngularEditorConfig} from "@kolkov/angular-editor";

@Component({
  selector: 'app-pages-edit',
  templateUrl: './pages-edit.component.html',
  styleUrls: ['./pages-edit.component.css']
})
export class PagesEditComponent implements OnInit {
  editState: boolean;
  error: any;

  selectedId: number | undefined;

  editForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('',Validators.required),
    prettyDescriptor: new FormControl('',Validators.required),
    content: new FormControl('', Validators.required),
    authorId: new FormControl('1')
  });
  formError: boolean = false;
  formErrorMessage: string | undefined;

  constructor(private _pagesService: PagesService,
              private _router: Router,
              private _route: ActivatedRoute) {
    this.editState = false;
  }

  ngOnInit(): void {
    this.loadPages();
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
      this.editorConfig.editable = this.editState;
      return;
    }
    let page = this.editForm.value as PageDto;
    this._pagesService.update(page.id, page).subscribe(page =>{
      this.editState = !this.editState;
      this.editorConfig.editable = this.editState;
      this.loadPages();
    })
  }

  goBack(): void {
    this._router.navigateByUrl('/post').then(r => {})
  }

  editorConfig: AngularEditorConfig = {};

  cancel() {
    this.loadPages();
    this.editState = !this.editState;
    this.editorConfig.editable = this.editState;
  }

}
