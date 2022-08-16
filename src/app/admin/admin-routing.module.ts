import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {UsersReadComponent} from "./users/users-read/users-read.component";
import {UsersDeleteComponent} from "./users/users-delete/users-delete.component";
import {UsersEditComponent} from "./users/users-edit/users-edit.component";
import {UsersCreateComponent} from "./users/users-create/users-create.component";

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

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
