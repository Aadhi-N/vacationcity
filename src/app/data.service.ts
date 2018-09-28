import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable()
export class DataService {


  private searchResultSource = new BehaviorSubject<string>("default");

   private messageSource = new BehaviorSubject<string>('default message');


  //current message variable used by components

  currentMessage = this.messageSource.asObservable();

  searchResultMessage = this.searchResultSource.asObservable();

  constructor() { }

  //changes currentMessage's current value

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  changeSearchResultMessage(searchResult: any) {
    this.searchResultSource.next(searchResult);
  }

}
