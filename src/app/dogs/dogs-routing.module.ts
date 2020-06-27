import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DogsPage } from './dogs.page';

const routes: Routes = [
  {
    path: '',
    component: DogsPage
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'galery',
    loadChildren: () => import('./galery/galery.module').then( m => m.GaleryPageModule)
  },
  {
    path: 'graphs',
    loadChildren: () => import('./graphs/graphs.module').then( m => m.GraphsPageModule)
  },
  {
    path: 'training',
    loadChildren: () => import('./training/training.module').then( m => m.TrainingPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DogsPageRoutingModule {}
