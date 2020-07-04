import { Component, OnInit } from '@angular/core';
import { DogsService } from '../dogs.service';
import { Dog } from '../dogs.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private dogsService: DogsService) {}
  dogs: Dog[];
  private dogsSub: Subscription;

  ngOnInit() {
    this.dogsSub = this.dogsService.dogs.subscribe(dogs => {
      this.dogs = dogs;
    });
  }

  onUpdateDogTest() {
    this.dogsService.updateSelecteDogBool(this.dogs[0]);
  }
}
