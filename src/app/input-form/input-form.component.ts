import { Component, OnInit, Input } from "@angular/core";
import { DataService } from "../data.service";
import { NgForm } from "@angular/forms";

declare var $: any;

import { Month } from "../month";
import { MonthService } from "../month.service";

import { City } from "../city";
import { CityService } from "../city.service";

import { CityTemp } from "../cityTemp";
import { CityTempService } from "../city-temp.service";

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

  submitClicked = false;

  months: Month[];
  cities: City[];
  cityTemps: CityTemp[];
  temps: Temp[];
  humidity: Humidity[];

  selectedMonth: number;
  selectedMonthName: string;
  selectedTemp: number;
  selectedHumidity: number;
  submitData: any[];

  filteredMonth: any[];

  celciusActive = true;
  farenheitActive = true;
  isMonthValue = true;
  isTempValue = true;
  isHumidityValue = true;

  filteredSearchResults: any;
  displaySearchResults: any;
  displaySearchQuery: any;

  constructor(
    private monthService: MonthService,
    private cityService: CityService,
    private cityTempService: CityTempService,
    private tempService: TempService,
    private humidityService: HumidityService,
    private data: DataService
  ) {}

  ngOnInit() {
    this.getMonths();
    this.getCities();
    this.getCityTemps();
    this.getTemps();
    this.getHumidity();
    this.onMonthClick(event);
    this.setMetric(event);
    this.humiditySlider(event);
    this.tempSlider(event);
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
    this.monthService.getMonths().subscribe(months => (this.months = months));
  }

  getCities(): void {
    this.cityService.getCities().subscribe(cities => {
      for (let city of cities[0]) {
        let cityArray = cities[1].filter(cityData => {
          if (city.id == cityData.cityId) {
            return cityData;
          }
        });
        city.city_temp = cityArray;
      }
      this.cities = cities[0];
    });
  }

  getCityTemps(): void {
    this.cityTempService.getCityTemps().subscribe(cityTemps => {
      this.cityTemps = cityTemps;
    });
  }

  getTemps(): void {
    this.tempService.getTemps().subscribe(temps => {
      this.temps = temps;
    });
  }

  getHumidity(): void {
    this.humidityService.getHumidity().subscribe(humidity => {
      this.humidity = humidity;
    });
  }

  onMonthClick(event): void {
    this.selectedMonth = Number(event.target.value);
    this.selectedMonthName = this.months[event.target.value - 1].name;
    this.isMonthValue = true;
  }

  tempSlider(event): void {
    this.selectedTemp = event;
    this.isTempValue = true;
  }

  humiditySlider(event): void {
    this.selectedHumidity = event;
    this.isHumidityValue = true;
  }

  setMetric(event) {
    this.celciusActive = !this.celciusActive;
    this.farenheitActive = !this.farenheitActive;
    this.farenheitActive ? (this.selectedTemp = 32) : (this.selectedTemp = 0);
  }

  displaySearchParams() {
    // sending search query params to other components 
    this.data.changeSearchQueryMessage([
      {
        monthQuery: this.selectedMonthName,
        tempQuery: this.selectedTemp,
        humidityQuery: this.selectedHumidity
      }
    ]);
  }

  validateForm() {
    // ternary condition that evaluates if filter options are selected; triggers error message if unselected
    void (this.selectedMonth === undefined && (this.isMonthValue = false));
    void (this.selectedTemp === undefined && (this.isTempValue = false));
    void (this.selectedHumidity === undefined && (this.isHumidityValue = false));
  }

  displayResults() {
    this.data.changeSearchResultMessage(this.displaySearchResults);
  }

  showData() {
    this.displaySearchParams();
    this.displayResults();
    this.validateForm();

    let filteredCities = [];
    let cityResults = [];

    for (let i = 0; i < this.cities.length; i++) {
      let cityTemp = this.cities[i].city_temp[this.selectedMonth - 1];

      if (
        !(
          cityTemp.avgCelcius < this.selectedTemp + 10 &&
          cityTemp.avgCelcius > this.selectedTemp - 10
        )
      )
        continue;

      if (
        !(
          cityTemp.avgHumidity < this.selectedHumidity + 10 &&
          cityTemp.avgHumidity > this.selectedHumidity - 10
        )
      )
        continue;

      filteredCities.push(cityTemp);
    }

    // PUSH FILTERED RESULTS INTO PROPERTY
    for (let filteredCity of filteredCities) {
      cityResults.push({
        name: this.cities[filteredCity.cityId - 1].name,
        avgCelcius: filteredCity.avgCelcius,
        avgHumidity: filteredCity.avgHumidity
      });
    }

    // ASSIGN PROPERTY TO MESSAGE SERVICE
    this.filteredSearchResults = cityResults;
    this.displaySearchResults = this.filteredSearchResults;
  }

  submit() {
    this.submitClicked = true;
  }
}