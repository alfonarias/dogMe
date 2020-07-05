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
  selected: boolean;
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

  emptyDog = new Dog('', '', '', '', new Date(), true, ''); // TODO: Esto es workaround para evitar que no hay perros seleccionados

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
          true,
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
                resData[key].selected,
                resData[key].userId
              )
            );
          }
        }
        return dogs;
      }),
      tap(dogs => {
        this._dogs.next(dogs);
      })
    );
  }

  // getSelectedDog() {
  //   this.dogs.subscribe(dogs => {
  //     // return dogs.filter(d => d.selected);
  //     return dogs[0];  // TODO: Return el unico que sea true cuando la logica se escriba
  //   });
  // }

  // fetchDogs() {
  //   this.getAllIndexesForString(['hola'], 'hola');
  // }

  // TODO: Esta funcion es para actualizar el perro seleccionado en la base de datos y que
  // se elija ese al iniciar la aplicacion. Queda trabajo por hacer aqui para hacerlo consistente
  // Este metodo no funciona bien del todo, falta discernir bien entre updatedAllDogsSelectedFalse, updatedDogs

  // updateSelecteDogBool(selectedDog: Dog) {
  //   let updatedDogs: Dog[];
  //   return this.dogs.pipe(
  //     take(1),
  //     switchMap(dgs => {
  //       if (!dgs || dgs.length < 0) {
  //         throw new Error('No dog id found!'); // this.fetchDogs();
  //       } else {
  //         return of(dgs);
  //       }
  //     }),
  //     switchMap(dgs => {
  //       updatedDogs = [...dgs];
  //       const updateSelectedDogIndex = dgs.findIndex(
  //         d => d.id === selectedDog.id
  //       );
  //       const updatedAllDogsSelectedFalse = updatedDogs.map(
  //         d =>
  //           new Dog(d.id, d.name, d.sex, d.breed, d.birthDate, false, d.userId)
  //       );

  //       const oldDog = updatedAllDogsSelectedFalse[updateSelectedDogIndex];
  //       oldDog.selected = true;
  //       updatedAllDogsSelectedFalse[updateSelectedDogIndex] = oldDog;

  //       return this.http.put(
  //         `${environment.fireBaseHTTP}/dogs/${oldDog.id}.json`,
  //         { ...updatedDogs[updateSelectedDogIndex], id: null }
  //       );
  //     }),
  //     tap(() => {
  //       this._dogs.next(updatedDogs);
  //     })
  //   );
  // }

  // getAllNonIndexesInArrayForString(arr: string[], val: string): number[] {
  //   return arr.map((elm, idx) => (elm !== val ? idx : 0)).filter(Number);
  // }
}
