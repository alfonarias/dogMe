import { Component, OnInit } from '@angular/core';
import { PopoverController, LoadingController } from '@ionic/angular';
import { Dog } from 'src/app/core/models/dogme.model';
import { DogsService } from 'src/app/core/services/dogs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dog-selector',
  templateUrl: './dog-selector.page.html',
  styleUrls: ['./dog-selector.page.scss'],
})
export class DogSelectorPage implements OnInit {
  constructor(
    private popOverCtrl: PopoverController,
    private dogService: DogsService,
    private loadingCtrl: LoadingController,
    private router: Router
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

  onSelectDog(dogId: string) {
    this.loadingCtrl
      .create({
        message: 'Actualizando...',
      })
      .then(loadingEl => {
        loadingEl.present();
        this.dogService.selectDifferentDog(dogId).subscribe(() => {
          loadingEl.dismiss();
          this.popOverCtrl.dismiss();
          this.router.navigate(['/dogs/tabs/home/']);
        });
      });
  }
}
