import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditVacPageRoutingModule } from './edit-vac-routing.module';

import { EditVacPage } from './edit-vac.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditVacPageRoutingModule
  ],
  declarations: [EditVacPage]
})
export class EditVacPageModule {}
