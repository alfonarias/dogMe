import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DogsPageRoutingModule } from './dogs-routing.module';
import { NgCalendarModule } from 'ionic2-calendar';
import { DogsPage } from './dogs.page';
import { DogSelectorPageModule } from '../components/dog-selector/dog-selector.module';

import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(es);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DogsPageRoutingModule,
    DogSelectorPageModule,
    NgCalendarModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-ES' }],
  declarations: [DogsPage],
})
export class DogsPageModule {}
