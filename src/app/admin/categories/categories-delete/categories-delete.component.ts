import { Component, OnInit } from '@angular/core';
import {CategoriesService} from "../../../shared/categoriesService/categories.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-categories-delete',
  templateUrl: './categories-delete.component.html',
  styleUrls: ['./categories-delete.component.css']
})
export class CategoriesDeleteComponent implements OnInit {
  private selectedId: number | undefined;

  constructor(private _categoriesService: CategoriesService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this.selectedId = Number(this._route.snapshot.paramMap.get('id'));
    this._categoriesService.delete(this.selectedId).subscribe(c => {
      this._router.navigateByUrl('/category').then(c => {})
    });
  }

}
