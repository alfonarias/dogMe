import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { DogsService } from 'src/app/core/services/dogs.service';
import { Dog } from 'src/app/core/models/dogme.model';

@Component({
  selector: 'app-dog-selector',
  templateUrl: './dog-selector.page.html',
  styleUrls: ['./dog-selector.page.scss'],
})
export class DogSelectorPage implements OnInit {
  constructor(
    private popOverCtrl: PopoverController,
    private dogService: DogsService
  ) {}
  dogs: Dog[];
  image: 'https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_1280.jpg';
  ngOnInit() {
    this.dogService.dogs.subscribe(dogs => {
      this.dogs = dogs;
    });
  }

  closePopover() {
    this.popOverCtrl.dismiss();
  }

  selectDog(dogId: string) {
    this.dogService.selectDifferentDog(dogId);
    this.popOverCtrl.dismiss();
  }
}
