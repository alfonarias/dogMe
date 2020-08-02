import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'dog-details',
    loadChildren: () => import('./dog-details/dog-details.module').then( m => m.DogDetailsPageModule)
  },
  {
    path: 'create-dog',
    loadChildren: () => import('./create-dog/create-dog.module').then( m => m.CreateDogPageModule)
  },
  {
    path: 'create-event',
    loadChildren: () => import('./create-event/create-event.module').then( m => m.CreateEventPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
