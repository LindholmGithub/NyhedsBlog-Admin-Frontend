import { Component, OnInit } from '@angular/core';
import {PostsService} from "../../../shared/postsService/posts.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-posts-delete',
  templateUrl: './posts-delete.component.html',
  styleUrls: ['./posts-delete.component.css']
})
export class PostsDeleteComponent implements OnInit {
  private selectedId: number | undefined;
  constructor(private _postsService: PostsService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this.selectedId = Number(this._route.snapshot.paramMap.get('id'));
    this._postsService.delete(this.selectedId).subscribe(p => {
      this._router.navigateByUrl('/post').then(p => {})
    });
  }

}
