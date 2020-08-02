import { Injectable } from '@angular/core';
import { take, tap, switchMap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Evento } from '../models/dogme.model';

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
export class EventService {
  private eventos$ = new BehaviorSubject<Evento[]>([]);

  get eventos() {
    return this.eventos$.asObservable();
  }

  constructor(private authService: AuthService, private http: HttpClient) {}

  addNewEvent(title: string, allDay: boolean, startTime: Date, endTime: Date) {
    let generatedId: string;
    let newEvent: Evento;
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        if (!userId) {
          throw new Error('No user id found!');
        }
        newEvent = new Evento(
          Math.random().toString(),
          title,
          startTime,
          endTime,
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
        this.eventos$.next(eventos.concat(newEvent));
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
        this.eventos$.next(eventoEl);
      })
    ); // ? query parameters. orderBy is only form firebase
  }
}
