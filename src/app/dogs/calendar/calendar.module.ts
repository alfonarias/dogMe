import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarPageRoutingModule } from './calendar-routing.module';

import { CalendarPage } from './calendar.page';
import { NgCalendarModule } from 'ionic2-calendar';
import { CreateEventPage } from '../home/create-event/create-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarPageRoutingModule,
    NgCalendarModule,
  ],
  declarations: [CalendarPage, CreateEventPage],
  entryComponents: [CalendarPage, CreateEventPage],
})
export class CalendarPageModule {}
