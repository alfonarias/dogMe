import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  maxBy(array: any[], column: string) {
    return array.reduce((prev, current) =>
      +prev[column] > +current[column] ? prev : current
    );
  }

  getAllNonIndexesInArrayForString(arr: string[], val: string): number[] {
    return arr.map((elm, idx) => (elm !== val ? idx : 0)).filter(Number);
  }
}
