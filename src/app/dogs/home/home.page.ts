import { Component, OnInit } from '@angular/core';
import { DogsService } from '../../core/services/dogs.service';
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

  // ngOnInit() {}

  ngOnInit() {
    this.dogsSub = this.dogsService.dogs.subscribe(dogs => {
      this.dogs = dogs;
    });
    this.selectedDogSub = this.dogsService.selectedDog.subscribe(
      dog => (this.selectedDog = dog)
    );
    console.log('on init dogs', this.dogs);
    console.log('on init selected', this.selectedDog);
  }

  ionViewWillEnter() {
    this.dogsService.fetchDogs().subscribe();

    console.log('on willEnter dogs', this.dogs);
    console.log('on willEnter selected', this.selectedDog);
  }

  createPopOverForDogSelector() {
    this.popOverCtrl
      .create({ component: DogSelectorPage, showBackdrop: false })
      .then(popoverElm => {
        popoverElm.present();
        // popoverElm.onDidDismiss();
      });
  }

  // showDog(){
  //   this.selectedDog.
  // }
}
