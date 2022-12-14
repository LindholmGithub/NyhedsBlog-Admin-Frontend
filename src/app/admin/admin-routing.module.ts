import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {UsersReadComponent} from "./users/users-read/users-read.component";
import {UsersDeleteComponent} from "./users/users-delete/users-delete.component";
import {UsersEditComponent} from "./users/users-edit/users-edit.component";
import {UsersCreateComponent} from "./users/users-create/users-create.component";
import {CategoriesReadComponent} from "./categories/categories-read/categories-read.component";
import {CategoriesCreateComponent} from "./categories/categories-create/categories-create.component";
import {CategoriesEditComponent} from "./categories/categories-edit/categories-edit.component";
import {CategoriesDeleteComponent} from "./categories/categories-delete/categories-delete.component";
import {PostsReadComponent} from "./posts/posts-read/posts-read.component";
import {PostsCreateComponent} from "./posts/posts-create/posts-create.component";
import {PostsEditComponent} from "./posts/posts-edit/posts-edit.component";
import {PostsDeleteComponent} from "./posts/posts-delete/posts-delete.component";
import {PagesReadComponent} from "./pages/pages-read/pages-read.component";
import {PagesCreateComponent} from "./pages/pages-create/pages-create.component";
import {PagesEditComponent} from "./pages/pages-edit/pages-edit.component";
import {PagesDeleteComponent} from "./pages/pages-delete/pages-delete.component";
import {CustomerReadComponent} from "./customer/customer-read/customer-read.component";
import {CustomerCreateComponent} from "./customer/customer-create/customer-create.component";
import {CustomerEditComponent} from "./customer/customer-edit/customer-edit.component";
import {CustomerDeleteComponent} from "./customer/customer-delete/customer-delete.component";

const routes: Routes = [
  {
    path: '', component: DashboardComponent
  },
  {
    path: 'user', component: UsersReadComponent
  },
  {
    path: 'user/create', component: UsersCreateComponent
  },
  {
    path: 'user/edit/:id', component: UsersEditComponent
  },
  {
    path: 'user/delete/:id', component: UsersDeleteComponent
  },
  {
    path: 'category', component: CategoriesReadComponent
  },
  {
    path: 'category/create', component: CategoriesCreateComponent
  },
  {
    path: 'category/edit/:id', component: CategoriesEditComponent
  },
  {
    path: 'category/delete/:id', component: CategoriesDeleteComponent
  },
  {
    path: 'post', component: PostsReadComponent
  },
  {
    path: 'post/create', component: PostsCreateComponent
  },
  {
    path: 'post/edit/:id', component: PostsEditComponent
  },
  {
    path: 'post/delete/:id', component: PostsDeleteComponent
  },
  {
    path: 'page', component: PagesReadComponent
  },
  {
    path: 'page/create', component: PagesCreateComponent
  },
  {
    path: 'page/edit/:id', component: PagesEditComponent
  },
  {
    path: 'page/delete/:id', component: PagesDeleteComponent
  },
  {
    path: 'customer', component: CustomerReadComponent
  },
  {
    path: 'customer/create', component: CustomerCreateComponent
  },
  {
    path: 'customer/edit/:id', component: CustomerEditComponent
  },
  {
    path: 'customer/delete/:id', component: CustomerDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
