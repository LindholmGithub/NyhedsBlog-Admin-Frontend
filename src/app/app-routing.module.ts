import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./admin/admin.module')
        .then(f => f.AdminModule)
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module')
        .then(f => f.AuthModule)
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
