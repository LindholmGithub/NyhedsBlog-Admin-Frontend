import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./admin/admin.module')
        .then(f => f.AdminModule)
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
