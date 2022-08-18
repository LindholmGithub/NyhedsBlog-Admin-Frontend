import { Component, OnInit } from '@angular/core';
import {catchError, Observable} from "rxjs";
import {CategoryDto} from "../../../shared/categoriesService/categories.dto";
import {CategoriesService} from "../../../shared/categoriesService/categories.service";

@Component({
  selector: 'app-categories-read',
  templateUrl: './categories-read.component.html',
  styleUrls: ['./categories-read.component.css']
})
export class CategoriesReadComponent implements OnInit {
  categories$: Observable<CategoryDto[]> | undefined;
  error: any;

  constructor(private _categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categories$ = this._categoriesService.getAll()
      .pipe(
        catchError(err => {
          this.error = err;
          throw err;
        })
      );
  }

}
