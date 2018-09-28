import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
declare var $: any;


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  displaySearchResults: any;
  message: string;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.specialCards(event);
    // this.searchResult();

    this.showResults();

    this.data.searchResultMessage.subscribe(searchResult => {this.displaySearchResults = searchResult; console.log(searchResult, 'from data')});
  }

  ngAfterViewInit() {

  }

  specialCards(event) {
    $('.special.cards .image').dimmer({
      on: 'hover'
    });
  }

  showResults() {
    console.log('keep showing')
  }

  newMessage() {
      this.data.changeMessage("Hello from Sibling")
    }

  // searchResult() {
  //   this.data.changeSearchResultMessage(this.displaySearchResults)
  // }

}
