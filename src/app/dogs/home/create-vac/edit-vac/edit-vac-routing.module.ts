import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditVacPage } from './edit-vac.page';

const routes: Routes = [
  {
    path: '',
    component: EditVacPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditVacPageRoutingModule {}
