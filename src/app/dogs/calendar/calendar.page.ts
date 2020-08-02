import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ModalController,
  LoadingController,
  ActionSheetController,
} from '@ionic/angular';
import { EventService } from 'src/app/core/services/events.service';
import { CreateEventComponent } from './create-event/create-event.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit, OnDestroy {
  constructor(
    private calService: EventService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  eventSource = [];
  isLoading = false;
  selectedDate: Date;

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
    this.selectedDate = event;
    console.log('current date change: ' + event);
  }

  onRangeChanged(ev) {
    console.log(
      'range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime
    );
  }

  onButtonSelected() {
    this.calService
      .addNewEvent('Baño', true, new Date(), new Date())
      .subscribe(elem => {
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

  openEventoModal(mode: 'select' | 'random') {
    this.modalCtrl
      .create({
        component: CreateEventComponent,
        componentProps: {
          selectedDay: this.selectedDate,
          selectedMode: mode,
        },
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
        if (resultData.role === 'confirm') {
          this.loadingCtrl
            .create({ message: 'Creando evento...' })
            .then(loadingEl => {
              loadingEl.present();
              const data = resultData.data.eventoData;
              this.calService
                .addNewEvent(
                  data.title,
                  data.allDay,
                  data.startTime,
                  data.endTime
                )
                .subscribe(() => {
                  loadingEl.dismiss();
                });
            });
        }
      });
  }

  onCreateEvent(event: Date) {
    console.log(this.selectedDate);
    this.selectedDate = event;
    console.log(this.selectedDate);
    this.actionSheetCtrl
      .create({
        header: 'Choose an Action',
        buttons: [
          {
            text: 'Select Date',
            handler: () => {
              this.openEventoModal('select');
            },
          },
          {
            text: 'Random Date',
            handler: () => {
              this.openEventoModal('random');
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
          },
        ],
      })
      .then(actionSheetEl => {
        actionSheetEl.present();
      });

    // this.router.navigateByUrl('/place/tabs/discover');
    // this.navCtrl.navigateBack('/places/tabs/discover'); // to display the back animation navigation
  }

  reloadSource(start, end) {}
  // (onRangeChanged)="reloadSource(startTime, endTime)" add to html
}
