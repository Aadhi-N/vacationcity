import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
declare var $: any;

@Component({
  selector: "app-search-results",
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.css"]
})
export class SearchResultsComponent implements OnInit {
  displaySearchResults: any;
  displaySearchQuery: any;

  constructor(private data: DataService) {}

  ngOnInit() {
    this.specialCards(event);

    this.showResults();

    this.data.searchResultMessage.subscribe(searchResult => {
      this.displaySearchResults = searchResult;
    });

    this.data.searchQueryMessage.subscribe(searchQuery => this.displaySearchQuery = searchQuery);

  }

  ngAfterViewInit() {}

  specialCards(event) {
    $(".special.cards .image").dimmer({
      on: "hover"
    });
  }

  showResults() {
    console.log("keep showing");
  }
}