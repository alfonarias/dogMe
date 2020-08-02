import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DogSelectorPageRoutingModule } from './dog-selector-routing.module';

import { DogSelectorPage } from './dog-selector.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DogSelectorPageRoutingModule
  ],
  declarations: [DogSelectorPage]
})
export class DogSelectorPageModule {}
