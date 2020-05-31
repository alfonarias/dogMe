import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { NgCalendarModule } from 'ionic2-calendar';
import { CrearEventoComponent } from '../calendario/crear-evento/crear-evento.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgCalendarModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
      },
    ]),
  ],
  declarations: [HomePage, CrearEventoComponent],
  entryComponents: [HomePage, CrearEventoComponent],
})
export class HomePageModule {}
