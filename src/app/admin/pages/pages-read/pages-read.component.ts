import { Component, OnInit } from '@angular/core';
import {catchError, Observable} from "rxjs";
import {PageDto} from "../../../shared/pagesService/pages.dto";
import {PagesService} from "../../../shared/pagesService/pages.service";

@Component({
  selector: 'app-pages-read',
  templateUrl: './pages-read.component.html',
  styleUrls: ['./pages-read.component.css']
})
export class PagesReadComponent implements OnInit {
  pages$: Observable<PageDto[]> | undefined;
  error: any;

  constructor(private _pageService: PagesService) { }

  ngOnInit(): void {
    this.pages$ = this._pageService.getAll()
      .pipe(
        catchError(err => {
          this.error = err;
          throw err;
        })
      )
  }

}
