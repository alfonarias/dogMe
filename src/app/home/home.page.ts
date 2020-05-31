import { Component, OnInit, OnDestroy } from '@angular/core';
import { CalendarioService } from '../calendario/calendario.service';
import { Evento } from '../calendario/evento.model';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  constructor(private calService: CalendarioService) {}

  eventSource = [];
  isLoading = false;

  private eventSourceSub: Subscription;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
    startingDayWeek: 1,
    startingDayMonth: 1,
  };

  onViewTitleChanged(title) {
    console.log(title);
  }

  onEventSelected(event) {
    console.log(
      'Event selected:' +
        event.startTime +
        '-' +
        event.endTime +
        ',' +
        event.title
    );
  }

  onTimeSelected(ev) {
    console.log(
      'Selected time:' +
        ev.selectedTime +
        ', hasEvents: ' +
        (ev.events !== undefined && ev.events.length !== 0) +
        ', disabled: ' +
        ev.disabled
    );
  }

  onCurrentDateChanged(event: Date) {
    console.log('current date change: ' + event);
  }

  onRangeChanged(ev) {
    console.log(
      'range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime
    );
  }

  onButtonSelected() {
    this.calService.addNewEvent().subscribe(elem => {
      console.log(elem);
    });
  }


  ngOnInit() {
    this.eventSourceSub = this.calService.eventos.subscribe(eventos => {
      this.eventSource = eventos;
    });
  }

  ngOnDestroy() {
    if (this.eventSourceSub) {
      this.eventSourceSub.unsubscribe();
    }
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.calService.fetchEventos().subscribe(() => {
      this.isLoading = false;
    });
  }
}
