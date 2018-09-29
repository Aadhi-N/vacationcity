import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable()
export class DataService {


  private searchResultSource = new BehaviorSubject<any>();
  private searchQuerySource = new BehaviorSubject<any>("default query");

  //current message variable used by components

  searchResultMessage = this.searchResultSource.asObservable();
  searchQueryMessage = this.searchQuerySource.asObservable();

  constructor() { }

  //changes currentMessage's current value

  changeSearchResultMessage(searchResult: any) {
    this.searchResultSource.next(searchResult);
  }

  changeSearchQueryMessage(searchQuery: any) {
    this.searchQuerySource.next(searchQuery);
  }

}
