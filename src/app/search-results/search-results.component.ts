import { Component, OnInit, Input } from "@angular/core";
import { DataService } from "../data.service";
declare var $: any;

@Component({
  selector: "app-search-results",
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.css"]
})
export class SearchResultsComponent implements OnInit {

  @Input() resultsHidden: string;

  displaySearchResults: any;
  displaySearchQuery: any;

  constructor(private data: DataService) {}

  ngOnInit() {

    this.specialCards(event);
    this.data.searchResultMessage.subscribe(searchResult => {
      this.displaySearchResults = searchResult; console.log('search results', searchResult)
    });

    this.data.searchQueryMessage.subscribe(searchQuery => this.displaySearchQuery = searchQuery);

  }

  ngAfterViewInit() {}

  specialCards(event) {
    $(".special.cards .image").dimmer({
      on: "hover"
    });
  }

  
}