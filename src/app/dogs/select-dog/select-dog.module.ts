import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectDogPageRoutingModule } from './select-dog-routing.module';

import { SelectDogPage } from './select-dog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectDogPageRoutingModule
  ],
  declarations: [SelectDogPage]
})
export class SelectDogPageModule {}
