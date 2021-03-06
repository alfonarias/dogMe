import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dogs', pathMatch: 'full' },
  {
    path: 'dogs',
    loadChildren: () =>
      import('./dogs/dogs.module').then(m => m.DogsPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then(m => m.AuthPageModule),
  },
  {
    path: 'dog-selector',
    loadChildren: () =>
      import('./components/dog-selector/dog-selector.module').then(
        m => m.DogSelectorPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
