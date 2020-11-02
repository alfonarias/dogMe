import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateVacPage } from './create-vac.page';

const routes: Routes = [
  {
    path: '',
    component: CreateVacPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateVacPageRoutingModule {}
