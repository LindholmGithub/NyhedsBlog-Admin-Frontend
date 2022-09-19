import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {PagesService} from "../../../shared/pagesService/pages.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PageCreateDto} from "../../../shared/pagesService/pagesCreate.dto";
import {ErrorDto} from "../../../shared/error.dto";
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {Editor, Toolbar} from "ngx-editor";

@Component({
  selector: 'app-pages-create',
  templateUrl: './pages-create.component.html',
  styleUrls: ['./pages-create.component.css']
})
export class PagesCreateComponent implements OnInit {

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

  error: any;
  createForm = new UntypedFormGroup({
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
    this.editor = new Editor();
  }

  ngOnInit(): void {
    this.createForm.get('title')?.valueChanges.subscribe(x => {
      this.createForm.get('prettyDescriptor')?.setValue(x.replaceAll(" ", "-").toLowerCase())
    })
  }

  doCreate(){
    let page = this.createForm.value as PageCreateDto;
    this._pagesService.save(page).subscribe(p => {
      this._router.navigateByUrl('/page').then(r => {});
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
