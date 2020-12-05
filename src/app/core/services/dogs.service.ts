import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Dog } from 'src/app/core/models/dogme.model';
import { switchMap, take, tap, map, takeLast, filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { UtilService } from './util.service';

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
  private dogs$ = new BehaviorSubject<Dog[]>([]);
  get dogs() {
    return this.dogs$.asObservable();
  }

  // TODO: Esto es workaround para evitar que no hay perros seleccionados
  // Para hacerlo mejor, se tiene que evitar visualizar el nombre hasta que todo haya cargado
  // Es decir, en dogs.page tener un boolean controlado por ngIf para esperar a que todo haya cargado
  emptyDog = new Dog('', '', '', '', new Date(), new Date(), '');

  private selectedDog$ = new BehaviorSubject<Dog>(this.emptyDog);
  get selectedDog() {
    return this.selectedDog$.asObservable();
  }

  get dogId() {
    return this.selectedDog$.asObservable().pipe(
      map(dog => {
        if (dog) {
          return dog.id;
        } else {
          return null;
        }
      })
    );
  }

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private util: UtilService
  ) {}

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
        this.dogs$.next(dgs.concat(newDog));
        this.selectedDog$.next(newDog); // Muestro en la app el perro que acabo de aniadir.
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
        this.dogs$.next(dogs);
        this.selectedDog$.next(this.util.maxBy(dogs, 'lastTimeSelected'));
      })
    );
  }

  selectDifferentDog(dogId: string) {
    console.log(dogId);
    let updatedDogs: Dog[];
    return this.dogs.pipe(
      take(1),
      switchMap(dogs => {
        console.log(dogs.length);
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
        console.log(updatedDogs);
        return this.http.put(`${environment.fireBaseHTTP}dogs/${dogId}.json`, {
          ...updatedDogs[updatedDogIndex],
          id: null,
        });
      }),
      tap(() => {
        this.dogs$.next(updatedDogs);
        const updatedDogIndex = updatedDogs.findIndex(d => d.id === dogId);
        this.selectedDog$.next(updatedDogs[updatedDogIndex]);
      })
    );
  }
}
