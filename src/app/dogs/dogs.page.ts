import { Component, OnInit } from '@angular/core';
import { DogsService } from '../core/services/dogs.service';
import { PopoverController } from '@ionic/angular';
import { Dog } from '../core/models/dogme.model';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs';
import { DogSelectorPage } from '../components/dog-selector/dog-selector.page';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.page.html',
  styleUrls: ['./dogs.page.scss'],
})
export class DogsPage implements OnInit {
  constructor(
    private dogsService: DogsService,
    private popOverCtrl: PopoverController
  ) {}

  dogs: Dog[];
  selectedDog: Dog;
  private dogsSub: Subscription;
  private selectedDogSub: Subscription;

  ngOnInit() {
    this.dogsSub = this.dogsService.dogs.subscribe((dogs) => {
      this.dogs = dogs;
    });
    this.selectedDogSub = this.dogsService.selectedDog.subscribe(
      (dog) => (this.selectedDog = dog)
    );
  }

  ionViewWillEnter() {
    this.dogsService.fetchDogs().subscribe();
  }

  createPopOverForDogSelector() {
    this.popOverCtrl
      .create({ component: DogSelectorPage, showBackdrop: false })
      .then((popoverElm) => {
        popoverElm.present();
      });
  }
}
