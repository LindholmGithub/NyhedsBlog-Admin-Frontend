import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersCreateComponent } from './users/users-create/users-create.component';
import { UsersDeleteComponent } from './users/users-delete/users-delete.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';
import { UsersReadComponent } from './users/users-read/users-read.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import { CategoriesCreateComponent } from './categories/categories-create/categories-create.component';
import { CategoriesEditComponent } from './categories/categories-edit/categories-edit.component';
import { CategoriesReadComponent } from './categories/categories-read/categories-read.component';
import { CategoriesDeleteComponent } from './categories/categories-delete/categories-delete.component';
import { PostsCreateComponent } from './posts/posts-create/posts-create.component';
import { PostsEditComponent } from './posts/posts-edit/posts-edit.component';
import { PostsDeleteComponent } from './posts/posts-delete/posts-delete.component';
import { PostsReadComponent } from './posts/posts-read/posts-read.component';
import {AngularEditorModule} from "@kolkov/angular-editor";
import { PagesCreate } from './pages/pages-create/pages-create.component/pages-create.component.component';
import { PagesCreateComponent } from './pages/pages-create/pages-create.component';
import { PagesDeleteComponent } from './pages/pages-delete/pages-delete.component';
import { PagesEditComponent } from './pages/pages-edit/pages-edit.component';
import { PagesReadComponent } from './pages/pages-read/pages-read.component';


@NgModule({
  declarations: [
    UsersCreateComponent,
    UsersDeleteComponent,
    UsersEditComponent,
    UsersReadComponent,
    DashboardComponent,
    CategoriesCreateComponent,
    CategoriesEditComponent,
    CategoriesReadComponent,
    CategoriesDeleteComponent,
    PostsCreateComponent,
    PostsEditComponent,
    PostsDeleteComponent,
    PostsReadComponent,
    PagesCreate.ComponentComponent,
    PagesCreateComponent,
    PagesDeleteComponent,
    PagesEditComponent,
    PagesReadComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    AngularEditorModule
  ]
})
export class AdminModule { }
