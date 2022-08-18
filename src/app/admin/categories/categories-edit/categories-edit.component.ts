import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "../../../shared/categoriesService/categories.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryDto} from "../../../shared/categoriesService/categories.dto";

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.css']
})
export class CategoriesEditComponent implements OnInit {
  editState: boolean;

  selectedId: number | undefined;
  editForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    prettyDescriptor: new FormControl('', Validators.required)
  });
  formError: boolean = false;
  formErrorMessage: string | undefined;

  constructor(private _categoriesService: CategoriesService, private _router: Router, private _route: ActivatedRoute) {
    this.editState = false;
  }

  ngOnInit(): void {
    this.loadCategories();
    this.editForm.get('title')?.valueChanges.subscribe(x => {
      this.editForm.get('prettyDescriptor')?.setValue(x.replaceAll(" ","-").toLowerCase())
    })
  }

  loadCategories(): void {
    this.selectedId = Number(this._route.snapshot.paramMap.get('id'));
    this._categoriesService.getOne(this.selectedId).subscribe(categories => {
      this.editForm.patchValue(categories);
    });
  }
  get title(){
    return this.editForm.get('title')
  }

  get description(){
    return this.editForm.get('description')
  }

  get prettyDescriptor(){
    return this.editForm.get('prettyDescriptor')
  }

  doEdit(): void{
    if (!this.editState){
      this.editState = !this.editState;
      return;
    }
    let category = this.editForm.value as CategoryDto;
    console.log(category)
    this._categoriesService.update(category.id, category).subscribe(category =>{
      this.editState = !this.editState;
      this.loadCategories();
    })
  }

  goBack(): void {
    this._router.navigateByUrl('/category').then(r => {})
  }

}