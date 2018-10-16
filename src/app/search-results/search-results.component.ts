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

  p: number = 1;
  displaySearchResults: any;
  displayCoordResults: any;
  displaySearchQuery: any;
  isResultsAvailable = true;
  displaySelectedCityCoords: any;
  celciusActive: boolean;
  fahrenheitActive: boolean; 
  metric: string;
  toggleOn: string = "check";
  toggleOff: string = "uncheck";

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
      searchQuery => {(this.displaySearchQuery = searchQuery);
      this.detectMetric()
      }
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

  changeMetric(event) {
    this.celciusActive = !this.celciusActive
    this.fahrenheitActive = !this.fahrenheitActive
    console.log('checked.target', this.celciusActive, this.fahrenheitActive)
    if (this.celciusActive) {
      this.metric = "Celcius"
    } else {
      this.metric = "Fahrenheit";
    }
  }

  detectMetric() {
    console.log(this.displaySearchQuery, 'searchResult')
    if (this.displaySearchQuery[0].fahrenheitActive === true) {
      this.celciusActive = false;
      this.fahrenheitActive = true;
      $('.ui.checkbox').checkbox(this.toggleOn)
      this.metric = "Fahrenheit";

    } else {
       this.celciusActive = true;
      this.fahrenheitActive = false;
      $('.ui.checkbox').checkbox(this.toggleOff)
      this.metric = "Celcius";
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