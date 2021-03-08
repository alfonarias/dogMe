import { Component, OnInit } from '@angular/core';
import { DateUtilsService } from 'src/app/core/services/date-utils.service';

@Component({
  selector: 'app-edit-vac',
  templateUrl: './edit-vac.page.html',
  styleUrls: ['./edit-vac.page.scss'],
})
export class EditVacPage implements OnInit {
  constructor(private datesUtilsService: DateUtilsService) {}

  maxYear = this.datesUtilsService.maxYear;
  minYear = this.datesUtilsService.minYear;
  todayYear = new Date().getFullYear();
  todayMonth = new Date().getMonth();

  months = this.datesUtilsService.months;

  monthDays = [];
  monthNumberDays = [];
  monthNameDays = [];

  selectedYear = this.todayYear;
  selectedMonth = this.todayMonth;
  selectedDay = 1; //inicial con alguno

  monthHasBeenSelected = false;
  dayHasBeenSelected = false;
  dateHasBeenSelected = this.monthHasBeenSelected && this.dayHasBeenSelected;

  ngOnInit() {
    this.updateMonthDaysList(
      this.datesUtilsService.getDaysArray(this.todayYear, this.todayMonth)
    );
  }

  onMonthChange(event) {
    let month = event.detail.value;
    let monthNumber = this.datesUtilsService.getMonthNumber(month);
    let monthDaysList = this.datesUtilsService.getDaysArray(
      this.selectedYear,
      monthNumber
    );

    this.monthHasBeenSelected = true;
    this.selectedMonth = monthNumber;
    this.updateMonthDaysList(monthDaysList);
    this.updateBoolean();
  }

  onDaySelected(event) {
    let day = event.detail.value;
    this.dayHasBeenSelected = true;
    this.updateBoolean();
  }

  onYearChange(event) {
    let year = new Date(event.detail.value).getFullYear();
    this.selectedYear = year;

    this.updateMonthDaysList(
      this.datesUtilsService.getDaysArray(year, this.selectedMonth)
    );
  }

  updateMonthDaysList(daysArray: any[]) {
    this.monthDays = daysArray;
    this.monthNumberDays = daysArray.map(m => m.dayNumber);
    this.monthNameDays = daysArray.map(m => m.dayName);
  }

  updateBoolean() {
    this.dateHasBeenSelected =
      this.monthHasBeenSelected && this.dayHasBeenSelected;
  }
}
