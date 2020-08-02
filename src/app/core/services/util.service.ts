import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  /**
   * @param array array of same class elements
   * @param property property of the class where we find the max;
   * @returns one element of the array based on the maximun value for selected property
   */
  maxBy(array: any[], property: string) {
    return array.reduce((prev, current) =>
      +prev[property] > +current[property] ? prev : current
    );
  }

  /**
   * @param arr array of strings
   * @param val value to match in the array
   * @returns list of arr indexes which are not equal to val
   */
  getAllNonIndexesInArrayForString(arr: string[], val: string): number[] {
    return arr.map((elm, idx) => (elm !== val ? idx : 0)).filter(Number);
  }
}
