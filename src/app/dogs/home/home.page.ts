import { Component, OnInit } from '@angular/core';
import { DogsService } from 'src/app/core/services/dogs.service';
import { Dog } from '../../core/models/dogme.model';
import { Subscription } from 'rxjs';
import { PopoverController } from '@ionic/angular';
import { DogSelectorPage } from 'src/app/components/dog-selector/dog-selector.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    private dogsService: DogsService,
    private popOverCtrl: PopoverController
  ) {}
  dogs: Dog[];
  selectedDog: Dog;
  private dogsSub: Subscription;
  private selectedDogSub: Subscription;

  ngOnInit() {}
}
