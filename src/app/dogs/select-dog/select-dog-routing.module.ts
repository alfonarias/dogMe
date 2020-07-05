import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectDogPage } from './select-dog.page';

const routes: Routes = [
  {
    path: '',
    component: SelectDogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectDogPageRoutingModule {}
