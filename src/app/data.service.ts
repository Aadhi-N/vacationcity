import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable()
export class DataService {

  private monthSource = new BehaviorSubject<string>("");

  private seasonSource = new BehaviorSubject<string>("");

  //current message variable used by components

  monthMessage = this.monthSource.asObservable();

  seasonMessage = this.seasonSource.asObservable();

  constructor() { }

  //changes currentMessage's current value

  changeMessage(month: string) {
    this.monthSource.next(month);
  }

  changeSeason(season: string) {
    this.seasonSource.next(season);
  }

}
