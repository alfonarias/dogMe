import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateVacPage } from './create-vac.page';

const routes: Routes = [
  {
    path: '',
    component: CreateVacPage
  },
  {
    path: 'edit-vac',
    loadChildren: () => import('./edit-vac/edit-vac.module').then( m => m.EditVacPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateVacPageRoutingModule {}
