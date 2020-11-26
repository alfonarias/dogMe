import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  constructor() {}
  eventSource = [];
  isLoading = false;
  selectedDate: Date;
  selectedDay = new Date();

  calendar = {
    mode: 'month',
    currentDate: this.selectedDate,
    startingDayWeek: 1,
    startingDayMonth: 1,
    formatDayHeader: 'EEEEE',
  };

  ngOnInit() {}

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }
}
