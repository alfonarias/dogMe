import { Injectable } from '@angular/core';
import { Evento } from '../calendario/evento.model';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { switchMap, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CalendarioService {
  private _eventos = new BehaviorSubject<Evento[]>([]);

  get eventos() {
    return this._eventos.asObservable();
  }

  constructor(private authService: AuthService, private http: HttpClient) {}

  addNewEvent() {
    let start = new Date(); // TODO: eliminar esta linea. Genera random
    let end = new Date();
    end.setMinutes(end.getMinutes() + 60);
    let generatedId: string;
    let newEvent: Evento;
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        console.log(userId);
        if (!userId) {
          throw new Error('No user id found!');
        }
        newEvent = new Evento(
          Math.random().toString(),
          'Titulo test # ' + start.toString(),
          start,
          end,
          false,
          userId // TODO: add user id
        );
        console.log(newEvent);
        return this.http.post<{ name: string }>(
          'https://dogme-eed9d.firebaseio.com/eventos.json',
          {
            ...newEvent,
            id: null,
          }
        );
      }),
      switchMap(resData => {
        generatedId = resData.name;
        return this.eventos;
      }),
      take(1),
      tap(eventos => {
        newEvent.id = generatedId;
        this._eventos.next(eventos.concat(newEvent));
      })
    );
  }
}
