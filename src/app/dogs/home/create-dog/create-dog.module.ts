import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateDogPageRoutingModule } from './create-dog-routing.module';

import { CreateDogPage } from './create-dog.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    CreateDogPageRoutingModule,
  ],
  declarations: [CreateDogPage],
})
export class CreateDogPageModule {}
