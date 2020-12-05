import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { VacService } from 'src/app/core/services/vac.service';
import { Vaccine } from 'src/app/core/models/vac.model';

@Component({
  selector: 'app-create-vac',
  templateUrl: './create-vac.page.html',
  styleUrls: ['./create-vac.page.scss'],
})
export class CreateVacPage implements OnInit {
  createVacForm: FormGroup;

  constructor(
    private vacService: VacService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}
  vacs: Vaccine[];

  ngOnInit() {
    this.vacService.fetchVacs().subscribe((vacs) => {
      this.vacs = vacs;
      console.log(vacs);
    });

    this.createVacForm = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'blur', // when it loses focus
        validators: [Validators.required],
      }),
      lastTime: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
    });
  }

  onCreateVac() {
    if (!this.createVacForm.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Añadiendo vacuna..',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.vacService
          .addVac(
            this.createVacForm.value.name,
            new Date(this.createVacForm.value.lastTime)
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.createVacForm.reset();
            this.router.navigate(['dogs/tabs/home']);
          });
      });
  }
}
