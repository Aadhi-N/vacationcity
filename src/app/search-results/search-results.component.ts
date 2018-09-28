import { Component, OnInit } from '@angular/core';
declare var $: any;


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.specialCards(event);
  }

  specialCards(event) {
    $('.special.cards .image').dimmer({
      on: 'hover'
    });
  }

  // scroll(event) {
  //   $('#search-results').scrollIntoView();
  //   console.log('dh')
  // }

}
