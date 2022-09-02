import { Component, OnInit } from '@angular/core';
import {PagesService} from "../../../shared/pagesService/pages.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-pages-delete',
  templateUrl: './pages-delete.component.html',
  styleUrls: ['./pages-delete.component.css']
})
export class PagesDeleteComponent implements OnInit {

  private selectedId: number | undefined;

  constructor(private _pagesService: PagesService,
              private _route: ActivatedRoute,
              private _router: Router) { }

  ngOnInit(): void {
    this.selectedId = Number(this._route.snapshot.paramMap.get('id'));
    this._pagesService.delete(this.selectedId).subscribe(p => {
      this._router.navigateByUrl('/page').then(p => {})
    });
  }

}
