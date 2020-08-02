import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { DogsService } from 'src/app/core/services/dogs.service';

@Component({
  selector: 'app-create-dog',
  templateUrl: './create-dog.page.html',
  styleUrls: ['./create-dog.page.scss'],
})
export class CreateDogPage implements OnInit {
  createDogForm: FormGroup;

  constructor(
    private dogsService: DogsService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.createDogForm = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'blur', // when it loses focus
        validators: [Validators.required],
      }),
      sex: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)],
      }),
      breed: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)],
      }),
      birthDate: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
    });
  }

  onCreateDog() {
    if (!this.createDogForm.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Añadiendo perro...',
      })
      .then(loadingEl => {
        loadingEl.present();
        this.dogsService
          .addDog(
            this.createDogForm.value.name,
            this.createDogForm.value.sex,
            this.createDogForm.value.breed,
            new Date(this.createDogForm.value.birthDate)
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.createDogForm.reset();
            this.router.navigate(['dogs/tabs/home']);
          });
      });
  }
}
