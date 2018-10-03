import { Component, OnInit, Input } from "@angular/core";
import { DataService } from "../data.service";
declare var $: any;

@Component({
  selector: "app-search-results",
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.css"]
})
export class SearchResultsComponent implements OnInit {
  /* FROM PARENT - HIDE COMPONENT UNTIL SUBMIT BUTTON CLICKED */
  @Input() resultsHidden: string;

  displaySearchResults: any;
  displayCoordResults: any;
  displaySearchQuery: any;
  isResultsAvailable = true;

  constructor(private data: DataService) {}

  ngOnInit() {
    this.specialCards(event);
    this.getCoords();

    this.data.searchResultMessage.subscribe(searchResult => {
      this.displaySearchResults = searchResult;
      this.validateResults();
    });

    this.data.searchQueryMessage.subscribe(
      searchQuery => (this.displaySearchQuery = searchQuery)
    );
  }

  validateResults() {
    if (
      !Array.isArray(this.displaySearchResults) ||
      !this.displaySearchResults.length
    ) {
      this.isResultsAvailable = false;
    } else {
      this.isResultsAvailable = true;
    }
  }

  getCoords() {
    this.displaySearchResults.filter((coords => {
      
    }))
  }

  clearSearch() {
    this.displaySearchResults = null;
  }

  /* SEMANTIC UI - DIMS CARD IMAGE ON HOVER */
  specialCards(event) {
    $(".special.cards .image").dimmer({
      on: "hover"
    });
  }
}