import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateVacPageRoutingModule } from './create-vac-routing.module';

import { CreateVacPage } from './create-vac.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    CreateVacPageRoutingModule,
  ],
  declarations: [CreateVacPage],
})
export class CreateVacPageModule {}
