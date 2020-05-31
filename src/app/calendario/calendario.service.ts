import { Injectable } from '@angular/core';
import { Evento } from '../calendario/evento.model';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { switchMap, take, tap, map } from 'rxjs/operators';

interface EventosData {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  allDay: boolean;
  userId: string;
}

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
        if (!userId) {
          throw new Error('No user id found!');
        }
        const randomTitle = Math.round(Math.random() * 100);
        newEvent = new Evento(
          Math.random().toString(),
          'Titulo random - ' + randomTitle,
          start,
          end,
          false,
          userId // TODO: add user id
        );
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

  fetchEventos() {
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        if (!userId) {
          throw new Error('User id not found');
        }
        return this.http.get<{ [key: string]: EventosData }>(
          `https://dogme-eed9d.firebaseio.com/eventos.json?orderBy="userId"&equalTo="${userId}"`
        );
      }),
      map(eventosData => {
        const eventos = [];
        for (const key in eventosData) {
          if (eventosData.hasOwnProperty(key)) {
            eventos.push(
              new Evento(
                key,
                eventosData[key].title,
                new Date(eventosData[key].startTime),
                new Date(eventosData[key].endTime),
                eventosData[key].allDay,
                eventosData[key].userId
              )
            );
          }
        }
        return eventos;
      }),
      tap(eventoEl => {
        this._eventos.next(eventoEl);
      })
    ); // ? query parameters. orderBy is only form firebase
  }
}
