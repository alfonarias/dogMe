import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GaleryPageRoutingModule } from './galery-routing.module';

import { GaleryPage } from './galery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GaleryPageRoutingModule
  ],
  declarations: [GaleryPage]
})
export class GaleryPageModule {}
