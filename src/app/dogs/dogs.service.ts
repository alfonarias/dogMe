import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Dog } from './dogs.model';
import { switchMap, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DogsService {
  private _dogs = new BehaviorSubject<Dog[]>([]);
  get dogs() {
    return this._dogs.asObservable();
  }

  constructor(private authService: AuthService, private http: HttpClient) {}

  addDog(name: string, sex: string, breed: string, birthDate: Date) {
    let generatedId: string;
    let newDog: Dog;
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        if (!userId) {
          throw new Error('No user id found!');
        }
        newDog = new Dog(
          Math.random.toString(),
          name,
          sex,
          breed,
          birthDate,
          userId
        );
        return this.http.post<{ name: string }>(
          environment.fireBaseHTTP + '/dogs.json',
          {
            ...newDog,
            id: null,
          }
        );
      }),
      switchMap(resData => {
        generatedId = resData.name;
        return this.dogs;
      }),
      take(1),
      tap(dogs => {
        newDog.id = generatedId;
        this._dogs.next(dogs.concat(newDog));
      })
    );
  }
}
