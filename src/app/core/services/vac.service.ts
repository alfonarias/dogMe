import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { DogsService } from './dogs.service';
import { HttpClient } from '@angular/common/http';
import { Vaccine } from 'src/app/core/models/vac.model';
import { switchMap, take, tap, map, takeLast, filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { UtilService } from './util.service';

interface VacData {
  name: string;
  lastTime: Date;
  dogId: string;
}

@Injectable({
  providedIn: 'root',
})
export class VacService {
  private vac$ = new BehaviorSubject<Vaccine[]>([]);
  get vac() {
    return this.vac$.asObservable();
  }

  // TODO: Esto es workaround para evitar que no hay perros seleccionados
  // Para hacerlo mejor, se tiene que evitar visualizar el nombre hasta que todo haya cargado
  // Es decir, en dogs.page tener un boolean controlado por ngIf para esperar a que todo haya cargado
  emptyVac = new Vaccine('', '', new Date(), '');

  private selectedVac$ = new BehaviorSubject<Vaccine>(this.emptyVac);
  get selectedVac() {
    return this.selectedVac$.asObservable();
  }

  constructor(
    //private authService: AuthService,
    private dogService: DogsService,
    private http: HttpClient,
    private util: UtilService
  ) {}

  addVac(name: string, lastTime: Date) {
    let generatedId: string;
    let newVac: Vaccine;
    return this.dogService.selectedDog.pipe(
      take(1),
      switchMap((dog) => {
        if (!dog) {
          throw new Error('No user id found!');
        }
        newVac = new Vaccine(Math.random.toString(), name, lastTime, dog.id);
        return this.http.post<{ name: string }>(
          environment.fireBaseHTTP + '/vaccine.json',
          {
            ...newVac,
            id: null,
          }
        );
      }),
      switchMap((resData) => {
        generatedId = resData.name;
        return this.vac;
      }),
      take(1),
      tap((dgs) => {
        newVac.id = generatedId;
        this.vac$.next(dgs.concat(newVac));
        this.selectedVac$.next(newVac); // Muestro en la app la vacuna que acabo de aniadir.
      })
    );
  }

  fetchVacs() {
    return this.dogService.dogId.pipe(
      take(1),
      switchMap((dogId) => {
        if (!dogId) {
          throw new Error('Dog id not found');
        }
        return this.http.get<{ [key: string]: VacData }>(
          `${environment.fireBaseHTTP}vaccine.json?orderBy="dogId"&equalTo="${dogId}"`
        );
      }),
      map((resData) => {
        const vacs = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            vacs.push(
              new Vaccine(
                key,
                resData[key].name,
                new Date(resData[key].lastTime),
                resData[key].dogId
              )
            );
          }
        }
        return vacs;
      }),
      tap((vacs) => {
        this.vac$.next(vacs);
        this.selectedVac$.next(this.util.maxBy(vacs, 'lastTime'));
      })
    );
  }
}
