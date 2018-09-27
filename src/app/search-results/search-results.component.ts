import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.specialCards;
  }

  specialCards(event) {
    $('.special.cards .image').dimmer({
      on: 'hover'
    });
  }

}
