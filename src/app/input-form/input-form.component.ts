import { Component, OnInit } from '@angular/core';
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
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {
  months: Month[];
  cities: City[];
  cityTemps: CityTemp[];
  temps: Temp[];
  humidity: Humidity[];

  selectedMonth: number;
  selectedTemp: number;
  selectedHumidity: number;
  submitData: any[];

  filteredMonth: any[];

  celciusActive = true;
  farenheitActive = true;

  filteredSearchResults: any;
  displaySearchResults: any;

  message: string;
  testMessage = "test from sib"


  constructor(private monthService: MonthService, private cityService: CityService, private cityTempService: CityTempService, private tempService: TempService, private humidityService: HumidityService, private data: DataService) { }

  ngOnInit() {
    this.getMonths();
    this.getCities();
    this.getCityTemps();
    this.getTemps();
    this.getHumidity();
    this.onMonthClick(event);
    this.setMetric(event);
    this.humiditySlider(event);
    // this.searchResult();
    this.data.currentMessage.subscribe(message => this.message = message)

    this.data.searchResultMessage.subscribe(searchResult => this.displaySearchResults = searchResult);
  }

  ngAfterViewInit() {
    this.tempSlider(event);
  }

  //DISPLAYS LIST OF MONTHS FROM DATA SOURCE

   getMonths(): void {
    this.monthService.getMonths()
      .subscribe(months => this.months = months);
  }

  getCities(): void {
    this.cityService.getCities()
      .subscribe(cities => {
          for (let city of cities[0]) {
            let cityArray = cities[1].filter(cityData => {
              if (city.id == cityData.cityId) {
                return cityData;
              }
            })
            city.city_temp = cityArray;
          }
        this.cities = cities[0]
        // console.log('getcities()', this.cities)
      })
  }

  getCityTemps(): void {
    this.cityTempService.getCityTemps()
      .subscribe(cityTemps => {
        this.cityTemps = cityTemps
      })
  }

  getTemps(): void {
    this.tempService.getTemps()
      .subscribe(temps => {this.temps = temps})
  }

  getHumidity(): void {
    this.humidityService.getHumidity()
      .subscribe(humidity => {this.humidity = humidity
      })
  }


  onMonthClick(event): void {
    (this.selectedMonth == undefined) ? this.selectedMonth = 1 : this.selectedMonth = Number(event.target.value); 
  }

  tempSlider(event): void {
    (!event) ? this.selectedTemp = 0 : this.selectedTemp = event;
  }

  humiditySlider(event): void {
    (!event) ? this.selectedHumidity = 50 : this.selectedHumidity = event;
  }

  setMetric(event) {
    this.celciusActive = !this.celciusActive;
    this.farenheitActive = !this.farenheitActive;
    this.farenheitActive ? this.selectedTemp = 32 : this.selectedTemp = 0;
  }

  displayResults() {
    this.data.changeSearchResultMessage(this.displaySearchResults)
  }

  showData() {

  this.displayResults();

    let filteredCities = [];
    let cityResults = [];

    for (let i = 0; i < this.cities.length; i++) {
      let cityTemp = this.cities[i].city_temp[this.selectedMonth -1];
      
      if (!((cityTemp.avgCelcius < (this.selectedTemp + 10)) && (cityTemp.avgCelcius > (this.selectedTemp - 10))))
        continue;

      if (!((cityTemp.avgHumidity < (this.selectedHumidity + 10)) && (cityTemp.avgHumidity > (this.selectedHumidity - 10))))
        continue;

      filteredCities.push(cityTemp)
    }

    // PUSH FILTERED RESULTS INTO PROPERTY 
    for (let filteredCity of filteredCities) {
      cityResults.push({name: this.cities[filteredCity.cityId - 1].name, avgCelcius: filteredCity.avgCelcius, avgHumidity: filteredCity.avgHumidity})
    }

      // ASSIGN PROPERTY TO MESSAGE SERVICE 
      this.filteredSearchResults = cityResults
      this.displaySearchResults = this.filteredSearchResults
  }
}

