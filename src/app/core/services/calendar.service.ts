import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { DogsService } from './dogs.service';
import { HttpClient } from '@angular/common/http';
import { Calendar } from 'src/app/core/models/calendar.model';
import { switchMap, take, tap, map, takeLast, filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { UtilService } from './util.service';

interface CalendarData {
  title: string;
  type: string;
  description: string;
  startTime: Date;
  endTime: Date;
  allDay: boolean;
  dogId: string;
}

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private calendar$ = new BehaviorSubject<Calendar[]>([]);
  get calendar() {
    return this.calendar$.asObservable();
  }

  emptyCalendar = new Calendar(
    '',
    '',
    '',
    '',
    new Date(),
    new Date(),
    false,
    ''
  );

  private selectedCal$ = new BehaviorSubject<Calendar>(this.emptyCalendar);

  get selectedCal() {
    return this.selectedCal$.asObservable();
  }

  constructor(
    private authService: AuthService,
    private dogService: DogsService,
    private http: HttpClient,
    private util: UtilService
  ) {}

  addEvent(
    title: string,
    type: string,
    description: string,
    startTime: Date,
    endTime: Date,
    allDay: boolean
  ) {
    let generatedId: string;
    let newEvent: Calendar;

    return this.dogService.selectedDog.pipe(
      take(1),
      switchMap(dog => {
        if (!dog) {
          throw new Error('No user id found!');
        }
        newEvent = new Calendar(
          Math.random.toString(),
          title,
          type,
          description,
          startTime,
          endTime,
          allDay,
          dog.id
        );
        return this.http.post<{ name: string }>(
          environment.fireBaseHTTP + '/events.json',
          {
            ...newEvent,
            id: null,
          }
        );
      }),
      switchMap(resData => {
        generatedId = resData.name;
        return this.calendar;
      }),
      take(1),
      tap(events => {
        newEvent.id = generatedId;
        this.calendar$.next(events.concat(newEvent));
        this.selectedCal$.next(newEvent);
      })
    );
  }

  fetchEvents() {
    return this.dogService.dogId.pipe(
      take(1),
      switchMap(dogId => {
        if (!dogId) {
          throw new Error('Dog id not found');
        }
        return this.http.get<{ [key: string]: CalendarData }>(
          `${environment.fireBaseHTTP}vaccine.json?orderBy="dogId"&equalTo="${dogId}"`
        );
      }),
      map(resData => {
        const events = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            events.push(
              new Calendar(
                key,
                resData[key].title,
                resData[key].type,
                resData[key].description,
                new Date(resData[key].startTime),
                new Date(resData[key].endTime),
                resData[key].allDay,
                resData[key].dogId
              )
            );
          }
        }
        return events;
      }),
      tap(events => {
        this.calendar$.next(events);
        this.selectedCal$.next(this.util.maxBy(events, 'startTime'));
      })
    );
  }
}
