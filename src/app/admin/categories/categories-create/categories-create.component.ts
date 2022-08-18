import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "../../../shared/categoriesService/categories.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryCreateDto} from "../../../shared/categoriesService/categoriesCreate.dto";
import {ErrorDto} from "../../../shared/error.dto";

@Component({
  selector: 'app-categories-create',
  templateUrl: './categories-create.component.html',
  styleUrls: ['./categories-create.component.css']
})
export class CategoriesCreateComponent implements OnInit {
  createForm = new FormGroup({
    title: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    prettyDescriptor: new FormControl('',Validators.required)
  });
  formError: boolean = false;
  formErrorMessage: string | undefined;

  constructor(private _categoriesService: CategoriesService, private _route: ActivatedRoute, private _router: Router) { }


  ngOnInit(): void {
    this.createForm.get('title')?.valueChanges.subscribe(x =>{
      this.createForm.get('prettyDescriptor')?.setValue(x.replaceAll(" ","-").toLowerCase())
    })
  }

  get title(){
    return this.createForm.get('title')
  }

  get description(){
    return this.createForm.get('description')
  }

  get prettyDescriptor(){
    return this.createForm.get('prettyDescriptor')
  }

  doCreate(): void{
    let category = this.createForm.value as CategoryCreateDto;
    this._categoriesService.save(category).subscribe(c => {
      this._router.navigateByUrl('/category').then(r => {});
    }, error => {
      this.formError = true;
      this.formErrorMessage = (error.error as ErrorDto).message
      });
  }

}
