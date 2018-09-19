import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject<string>("");

  private seasonSource = new BehaviorSubject<string>("");

  //current message variable used by components

  currentMessage = this.messageSource.asObservable();

  seasonMessage = this.seasonSource.asObservable();

  constructor() { }

  //changes currentMessage's current value

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  changeSeason(season: string) {
    this.seasonSource.next(season);
  }

}
