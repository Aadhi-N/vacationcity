import { Component, OnInit, Input } from "@angular/core";
import { DataService } from "../data.service";
import { NgForm } from "@angular/forms";

declare var $: any;

import { Month } from "../month";
import { MonthService } from "../month.service";

import { City } from "../city";
import { CityService } from "../city.service";

import { CityCoord } from "../cityCoord";
import { CityCoordService } from "../city-coord.service";

import { Temp } from "../temp";
import { TempService } from "../temp.service";

import { Humidity } from "../humidity";
import { HumidityService } from "../humidity.service";


@Component({
  selector: "app-input-form",
  templateUrl: "./input-form.component.html",
  styleUrls: ["./input-form.component.css"]
})
export class InputFormComponent implements OnInit {
  @Input() formHidden: string;

  submitClicked = true;

  months: Month[];
  cities: City[];
  temps: Temp[];
  tempRange: any = {
    high: 50,
    low: -50,
    mid: 0}
  humidity: Humidity[];

  selectedMonth: number;
  selectedMonthName: string;
  selectedTemp: number = 0;
  convertedTemp: number = null;
  selectedHumidity: number = 50;
  submitData: any[];

  filteredMonth: any[];

  celciusActive: boolean = true;
  fahrenheitActive: boolean = false;
  isMonthValue = true;
  isTempValue = true;
  isHumidityValue = true;

  filteredSearchResults: any;
  displaySearchResults: any;
  displaySearchQuery: any;

  constructor(
    private monthService: MonthService,
    private cityService: CityService,
    private tempService: TempService,
    private humidityService: HumidityService,
    private data: DataService
  ) {}

  ngOnInit() {
    this.getMonths();
    this.getCities();
    this.getTemps();
    this.getHumidity();
  }

  ngAfterViewInit() {
    this.data.searchResultMessage.subscribe(
      searchResult => (this.displaySearchResults = searchResult)
    );

    this.data.searchQueryMessage.subscribe(
      searchQuery => (this.displaySearchQuery = searchQuery)
    );
  }

  //DISPLAYS LIST OF MONTHS FROM DATA SOURCE

  getMonths(): void {
    this.monthService.getMonths().subscribe(months => {(this.months = months['results'])});
  }

  getCities(): void {
    this.cityService.getCities().subscribe(cities => {
      for (let city of cities[0].results) {
        let cityArray = cities[1].results.filter(cityData => {
          if (city.cityID == cityData.city_id) {
            return cityData;
          }
        });

        city.city_temp = cityArray;

        let coordArray = cities[2].results.filter(coords => {
          if (city.cityID == coords.city_id){
            return coords;
          }
        });

        city.city_coords = coordArray;
      }
      this.cities = cities[0].results;
    });
  }

  getTemps(): void {
    this.tempService.getTemps().subscribe(temps => {
      this.temps = temps;
    });
  }

  getHumidity(): void {
    this.humidityService.getHumidity().subscribe(humidity => {
      this.humidity = humidity['results'];
    });
  }

  onMonthClick(event): void {
    this.selectedMonth = event.target.value;
    this.selectedMonthName = this.months[event.target.value - 1].monthName;
    this.isMonthValue = true;
  }

  tempSlider(event) {
    this.selectedTemp = event;
    this.isTempValue = true;
  }

  setToCelcius(event) {
    this.celciusActive = true;
    this.fahrenheitActive = false;
    this.setMetric()
  }

  setToFahrenheit(event) {
    this.celciusActive = false;
    this.fahrenheitActive = true;
    this.setMetric()
  }

  setMetric() { 
    if (this.celciusActive === true) {
      this.selectedTemp !== 0 ? this.selectedTemp : 0;

      this.tempRange = {
        high: (this.temps['results'][0].high - 32) * 5 / 9,
        low: (this.temps['results'][0].low - 32) * 5 / 9
        mid: 0
      }
    } else {
      this.selectedTemp !== 32 ? this.selectedTemp : 32;
      this.tempRange = {
        high: this.temps['results'][0].high,
        low: this.temps['results'][0].low,
        mid: 0
      };
    }
  }

  humiditySlider(event): void {
    this.selectedHumidity = event;
    this.isHumidityValue = true;
  }

  displaySearchParams() {
    /* sending search query params to other components */

    this.data.changeSearchQueryMessage([
      {
        monthQuery: this.selectedMonthName,
        tempQuery: this.selectedTemp,
        humidityQuery: this.selectedHumidity,
        metricQuery: this.celciusActive === true? "Celcius" : "Fahrenheit",
        celciusActive: this.celciusActive,
        fahrenheitActive: this.fahrenheitActive
      }
    ]);
  }

  validateForm() {
    /* ternary condition that evaluates if filter options are selected; triggers error message if unselected */
    void (this.selectedMonth === undefined && (this.isMonthValue = false));
    void (this.selectedTemp === undefined && (this.isTempValue = false));
    void (this.selectedHumidity === undefined && (this.isHumidityValue = false));

    this.validateMetric();
  }

  displayResults(results) {
    this.data.changeSearchResultMessage(results);
    console.log('DISPLAY RESULTS', results)
  }

  validateMetric() {
    if (this.fahrenheitActive === true) {
      this.convertedTemp = this.selectedTemp
      this.performQuery(this.convertedTemp);
    } else {
        this.convertedTemp = this.selectedTemp * 9 / 5 + 32;
        this.performQuery(this.convertedTemp)
    }
  }

  performQuery(convertedTemp) {
    let filteredCities = [];
    let cityResults = [];

    for (let i = 0; i < this.cities.length; i++) {
      let cityTemp: any = this.cities[i].city_temp[this.selectedMonth - 1];

      if (
        !(
          Number(cityTemp.avgFahrenheit) < convertedTemp + 10 &&
          Number(cityTemp.avgFahrenheit) > convertedTemp - 10
        )
      )
        continue;

      if (
        !(
          Number(cityTemp.avgHumidity) < this.selectedHumidity + 10 &&
          Number(cityTemp.avgHumidity) > this.selectedHumidity - 10
        )
      )
        continue;

      filteredCities.push(cityTemp);
    }

    // PUSH FILTERED RESULTS INTO PROPERTY
    for (let filteredCity of filteredCities) {
      cityResults.push({
        name: this.cities[filteredCity.city_id - 1].cityName,
        avgFahrenheit: filteredCity.avgFahrenheit,
        avgHumidity: filteredCity.avgHumidity,
        coordinates: this.cities[filteredCity.city_id - 1].city_coords[0]
      });
    }

    // ASSIGN PROPERTY TO MESSAGE SERVICE
    this.filteredSearchResults = cityResults;    
    this.displaySearchResults = this.filteredSearchResults;

    this.displaySearchParams();
    this.displayResults(this.displaySearchResults);
  }

  submit() {
    this.submitClicked = false;
  }
}