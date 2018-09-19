import { Injectable } from '@angular/core';
import { Month } from "./month";
import { MONTHS } from "./mock-months";

@Injectable({
  providedIn: 'root'
})
export class MonthService {

  constructor() { }

  getMonths(): Month[] {
    return MONTHS;
  }
}
