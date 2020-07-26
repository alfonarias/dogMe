import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Dog } from './dogs.model';
import { switchMap, take, tap, map, takeLast, filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';

interface DogsData {
  birthDate: string;
  breed: string;
  name: string;
  lastTimeSelected: Date;
  sex: string;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class DogsService {
  private _dogs = new BehaviorSubject<Dog[]>([]);
  get dogs() {
    return this._dogs.asObservable();
  }

  emptyDog = new Dog('', '', '', '', new Date(), new Date(), ''); // TODO: Esto es workaround para evitar que no hay perros seleccionados

  private _selectedDog = new BehaviorSubject<Dog>(this.emptyDog);
  get selectedDog() {
    return this._selectedDog.asObservable();
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
          new Date(),
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
      tap(dgs => {
        newDog.id = generatedId;
        this._dogs.next(dgs.concat(newDog));
        this._selectedDog.next(newDog); // Muestro en la app el perro que acabo de aniadir.
      })
    );
  }

  fetchDogs() {
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        if (!userId) {
          throw new Error('User id not found');
        }
        return this.http.get<{ [key: string]: DogsData }>(
          `${environment.fireBaseHTTP}dogs.json?orderBy="userId"&equalTo="${userId}"`
        );
      }),
      map(resData => {
        const dogs = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            dogs.push(
              new Dog(
                key,
                resData[key].name,
                resData[key].sex,
                resData[key].breed,
                new Date(resData[key].birthDate),
                new Date(resData[key].lastTimeSelected),
                resData[key].userId
              )
            );
          }
        }
        return dogs;
      }),
      tap(dogs => {
        this._dogs.next(dogs);
        this._selectedDog.next(this.maxBy(dogs, 'lastTimeSelected')); // TODO: Esto devuelve el primer perro, no el ultimo seleccionado
      })
    );
  }

  selectDifferentDog(dogId: string) {
    let updatedDogs: Dog[];
    return this.dogs.pipe(
      take(1),
      switchMap(dogs => {
        if (!dogs || dogs.length <= 0) {
          return this.fetchDogs();
        } else {
          return of(dogs);
        }
      }),
      switchMap(dogs => {
        const updatedDogIndex = dogs.findIndex(d => d.id === dogId);
        updatedDogs = [...dogs];
        const oldDog = updatedDogs[updatedDogIndex];
        updatedDogs[updatedDogIndex] = new Dog(
          oldDog.id,
          oldDog.name,
          oldDog.sex,
          oldDog.breed,
          oldDog.birthDate,
          new Date(),
          oldDog.userId
        );
        return this.http.put(
          `${environment.fireBaseHTTP}dogs.json?orderBy="userId"&equalTo="${dogId}"`,
          { ...updatedDogs[updatedDogIndex], id: null }
        );
      }),
      tap(() => {
        this._dogs.next(updatedDogs);
        const updatedDogIndex = updatedDogs.findIndex(d => d.id === dogId);
        this._selectedDog.next(updatedDogs[updatedDogIndex]);
      })
    );
  }

  // UTILS  TODO: Crear un file auxiliar para este tipo de funciones y add unit tests

  maxBy(array: any[], column: string) {
    return array.reduce((prev, current) =>
      +prev[column] > +current[column] ? prev : current
    );
  }

  getAllNonIndexesInArrayForString(arr: string[], val: string): number[] {
    return arr.map((elm, idx) => (elm !== val ? idx : 0)).filter(Number);
  }
}
