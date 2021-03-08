import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
// class Week {
//   constructor(public start: number, public end: number) {}
// }
export class DateUtilsService {
  constructor() {}

  public minYear = 1990;
  public maxYear = new Date().getFullYear() + 20;
  //public startingYear = new Date().getFullYear();

  monthsNumberAndName = [
    { monthNumber: 0, monthName: 'Enero' },
    { monthNumber: 1, monthName: 'Febrero' },
    { monthNumber: 2, monthName: 'Marzo' },
    { monthNumber: 3, monthName: 'Abril' },
    { monthNumber: 4, monthName: 'Mayo' },
    { monthNumber: 5, monthName: 'Junio' },
    { monthNumber: 6, monthName: 'Julio' },
    { monthNumber: 7, monthName: 'Agosto' },
    { monthNumber: 8, monthName: 'Septiembre' },
    { monthNumber: 9, monthName: 'Octubre' },
    { monthNumber: 10, monthName: 'Noviembre' },
    { monthNumber: 11, monthName: 'Diciembre' },
  ];

  days = ['D', 'L', 'M', 'X', 'J', 'V', 'S']; //date.getDay() usa domingo el primero

  months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  getWeeksInMonth(year: number, month: number) {
    // const weeks: Week[] = [];
    const weeks = [];
    const firstDay: Date = new Date(year, month, 1);
    const lastDay: Date = new Date(year, month + 1, 0);
    const daysInMonth: number = lastDay.getDate();
    let dayOfWeek: number = firstDay.getDay();
    let start: number;
    let end: number;

    for (let i = 1; i < daysInMonth + 1; i++) {
      if (dayOfWeek === 0 || i === 1) {
        start = i;
      }

      if (dayOfWeek === 6 || i === daysInMonth) {
        end = i;

        if (start !== end) {
          // weeks.push(new Week(start, end));
          weeks.push({ Start: start, End: end });
        }
      }

      dayOfWeek = new Date(year, month, i).getDay();
    }

    return weeks;
  }

  getMonthNumber(month: string) {
    const monthNumber = this.monthsNumberAndName
      .filter(m => m.monthName === month)
      .map(m => m.monthNumber)[0];
    if (typeof monthNumber === 'undefined') {
      throw new Error('Month not found');
    }
    return monthNumber;
  }

  getDaysArray(year: number, month: number) {
    let monthIndex = month; // 0-Jan to 11-Dec
    let names = this.days;
    let date = new Date(year, monthIndex, 1);
    let result = [];
    while (date.getMonth() === monthIndex) {
      result.push({ dayNumber: date.getDate(), dayName: names[date.getDay()] });
      date.setDate(date.getDate() + 1);
    }
    return result;
  }
}
