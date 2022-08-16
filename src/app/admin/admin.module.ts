import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersCreateComponent } from './users/users-create/users-create.component';
import { UsersDeleteComponent } from './users/users-delete/users-delete.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';
import { UsersReadComponent } from './users/users-read/users-read.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    UsersCreateComponent,
    UsersDeleteComponent,
    UsersEditComponent,
    UsersReadComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
