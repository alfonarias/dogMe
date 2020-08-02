import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { DogsPageRoutingModule } from './dogs-routing.module';

import { DogsPage } from './dogs.page';
import { DogSelectorPageModule } from '../components/dog-selector/dog-selector.module';

import { HttpClientModule } from '@angular/common/http';
import { NgCalendarModule } from 'ionic2-calendar';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { RouteReuseStrategy } from '@angular/router';
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
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'es-ES' },
  ],
  declarations: [DogsPage],
})
export class DogsPageModule {}
