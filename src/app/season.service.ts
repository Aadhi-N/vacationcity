import { Injectable } from '@angular/core';
import { Season } from "./season";
import { SEASONS } from "./mock-seasons";

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  constructor() { }

  getSeasons(): Season[] {
    return SEASONS;
  }
}
