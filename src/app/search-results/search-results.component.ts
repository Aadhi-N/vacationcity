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
  displaySelectedCityCoords: any;

  constructor(private data: DataService) {}

  ngOnInit() {
    this.specialCards(event);
    this.locateOnMaps(event);

    this.data.searchResultMessage.subscribe(searchResult => {
      this.displaySearchResults = searchResult;
         // console.log('display', searchResult)
      this.validateResults();
    });

    this.data.searchQueryMessage.subscribe(
      searchQuery => (this.displaySearchQuery = searchQuery)
    );

    this.data.searchCityCoordsMessage.subscribe(
      searchCityCoords => {(this.displaySelectedCityCoords = searchCityCoords)}
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

  clearSearch() {
    this.displaySearchResults = null;
  }

  /* SEMANTIC UI - DIMS CARD IMAGE ON HOVER */
  specialCards(event) {
    $(".special.cards .image").dimmer({
      on: "hover"
    });
  }

  locateOnMaps(event) {
    this.data.changeCityCoordsMessage(
      this.displaySelectedCityCoords = {
        lat: Number(event.latitude),
        lng: Number(event.longtitude),
      }
    )
  }
}