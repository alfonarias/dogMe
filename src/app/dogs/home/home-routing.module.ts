import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'dog-details',
    loadChildren: () =>
      import('./dog-details/dog-details.module').then(
        m => m.DogDetailsPageModule
      ),
  },
  {
    path: 'create-dog',
    loadChildren: () =>
      import('./create-dog/create-dog.module').then(m => m.CreateDogPageModule),
  },
  {
    path: 'create-event',
    loadChildren: () =>
      import('../calendar/create-event/create-event.module').then(
        m => m.CreateEventPageModule
      ),
  },
  {
    path: 'create-vac',
    loadChildren: () =>
      import('./create-vac/create-vac.module').then(m => m.CreateVacPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
