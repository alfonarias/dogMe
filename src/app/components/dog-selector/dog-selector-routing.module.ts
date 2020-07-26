import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DogSelectorPage } from './dog-selector.page';

const routes: Routes = [
  {
    path: '',
    component: DogSelectorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DogSelectorPageRoutingModule {}
