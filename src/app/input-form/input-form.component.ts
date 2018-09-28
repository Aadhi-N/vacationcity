import { Component, OnInit } from '@angular/core';
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

  preSubmit: any;


  constructor(private monthService: MonthService, private cityService: CityService, private cityTempService: CityTempService, private tempService: TempService, private humidityService: HumidityService) { }

  ngOnInit() {
    this.getMonths();
    this.getCities();
    this.getCityTemps();
    this.getTemps();
    this.getHumidity();
    this.onMonthClick(event);
    this.setMetric(event);
    this.humiditySlider(event);
  }

  ngAfterViewInit() {
    this.tempSlider(event);
    // this.showData();
    // this.showResult(event);
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

  showData() {

    console.log('this cities', this.cities)

    let filteredCities = [];

    for (let i = 0; i < this.cities.length; i++) {
      let cityTemp = this.cities[i].city_temp[this.selectedMonth -1];
      
      if (!((cityTemp.avgCelcius < (this.selectedTemp + 10)) && (cityTemp.avgCelcius > (this.selectedTemp - 10))))
        continue;

      if (!((cityTemp.avgHumidity < (this.selectedHumidity + 10)) && (cityTemp.avgHumidity > (this.selectedHumidity - 10))))
        continue;

      filteredCities.push(cityTemp)
    }

    for (let filteredCity of filteredCities) {
      console.log(this.cities[filteredCity.cityId - 1].name)
    }



    // let filteredTemperatures = temperaturesForSelectedMonth.filter(temp => {
    //   // console.log('temp', temp)
    //   if (((this.selectedTemp - 10) < temp.avgCelcius) && (temp.avgCelcius < (this.selectedTemp + 10))) {
    //     return temp;
    //   }
    // })

    // let filteredHumidity = filteredTemperatures.filter(humidity => {
    //   if (((this.selectedHumidity - 10) < humidity.avgHumidity) && (humidity.avgHumidity < (this.selectedHumidity + 10))) {
    //     return humidity;
    //   }
    // })


    // this.showResult()

  }
  
  showResult() {
    // this.preSubmit = {
    //   smonth: this.selectedMonth,
    //   stemp: this.selectedTemp,
    //   shumidity: this.selectedHumidity
    // }
    // console.log('showResult()', this.preSubmit)
  }



}

