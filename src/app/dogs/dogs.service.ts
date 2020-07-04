import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Dog } from './dogs.model';
import { switchMap, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, of } from 'rxjs';

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
          false, //keep true
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

  // fetchDogs() {
  //   this.getAllIndexesForString(['hola'], 'hola');
  // }

  updateSelecteDogBool(selectedDog: Dog) {
    let updatedDogs: Dog[];
    return this.dogs.pipe(
      take(1),
      switchMap(dgs => {
        if (!dgs || dgs.length < 0) {
          throw new Error('No user id found!'); // this.fetchDogs();
        } else {
          return of(dgs);
        }
      }),
      switchMap(dgs => {
        const updatedDogsIndex = dgs.findIndex(d => d.id === selectedDog.id);
        // const updatedDogsIndexs = dgs.ma;
        updatedDogs = [...dgs];
        const oldDog = updatedDogs[updatedDogsIndex];
        oldDog.selected = true; // aqui cambiar todos a false
        updatedDogs[updatedDogsIndex] = oldDog;
        return this.http.put(
          `${environment.fireBaseHTTP}/dogs/${oldDog.id}.json`,
          { ...updatedDogs[updatedDogsIndex], id: null }
        );
      }),
      tap(() => {
        this._dogs.next(updatedDogs);
      })
    );
  }

  getAllIndexesForString(arr: string[], val: string): any[] {
    return arr.map((elm, idx) => (elm === val ? idx : '')).filter(String);
  }
}
