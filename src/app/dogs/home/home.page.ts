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
  selectedDog: Dog;
  private dogsSub: Subscription;
  private selectedDogSub: Subscription;

  ngOnInit() {
    this.dogsService.fetchDogs().subscribe(data => console.log(data));
    this.dogsSub = this.dogsService.dogs.subscribe(dogs => {
      this.dogs = dogs;
    });
    this.selectedDogSub = this.dogsService.selectedDog.subscribe(
      dog => (this.selectedDog = dog)
    );
  }
}
