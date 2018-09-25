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


  constructor(private monthService: MonthService, private cityService: CityService, private cityTempService: CityTempService, private tempService: TempService, private humidityService: HumidityService) { }

  ngOnInit() {
    this.getMonths();
    this.getCities();
    this.getCityTemps();
    this.getTemps();
    this.getHumidity();
    // this.showDropdown();
    this.onMonthClick(event);
    // this.filteredMonth=[];
  }

  ngAfterViewInit() {
    this.tempSlider(event);
    this.humiditySlider(event);
    this.showData();
  }

  //DISPLAYS LIST OF MONTHS FROM DATA SOURCE
   getMonths(): void {
    this.monthService.getMonths()
      .subscribe(months => this.months = months);
  }

  getCities(): void {
    this.cityService.getCities()
      .subscribe(cities => {
        this.cities = cities
        // console.log('getcities', this.cities)
      })
  }

  getCityTemps(): void {
    this.cityTempService.getCityTemps()
      .subscribe(cityTemps => {
        this.cityTemps = cityTemps
        // console.log('citytemps', this.cityTemps)
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

  // showDropdown(): void {
  //   $('.ui.dropdown')
  //     .dropdown()
  //   ;
  // }

  onMonthClick(event): void {
    if (this.selectedMonth == undefined) {
      // this.selectedMonth = 1;
    }
    this.selectedMonth = Number(event.target.value);
    // console.log('onMonthClick', typeof this.selectedMonth)
  }

  tempSlider(event): void {
    this.selectedTemp = event;
  }

  humiditySlider(event): void {
    this.selectedHumidity = event;
  }

  showData() {
    let temperaturesForSelectedMonth = this.cityTemps.filter(cityTemp => {
      if (cityTemp.monthId === this.selectedMonth) {
        return cityTemp;
      }
    })

    let filteredTemperatures = temperaturesForSelectedMonth.filter(temp => {
      // console.log('temp', temp)
      if (((this.selectedTemp - 10) < temp.avgCelcius) && (temp.avgCelcius < (this.selectedTemp + 10))) {
        return temp;
      }
    })

    let filteredHumidity = filteredTemperatures.filter(humidity => {
      if (((this.selectedHumidity - 10) < humidity.avgHumidity) && (humidity.avgHumidity < (this.selectedHumidity + 10))) {
        return humidity;
      }
    })

    // take array of objects, convert into array of integers 

    let loopedArray = [];
    let i = 0;
    for (i; i < filteredHumidity.length; i++) {
      loopedArray.push(filteredHumidity[i].cityId)
      
    }

    console.log('loopedArray', loopedArray)

    let applicableCities = this.cities.filter(city => {
      if (loopedArray.includes(city.id)) {
        return city.name;
      }
    })

    console.log('applicableCities', applicableCities)
    this.showResult(applicableCities)

  }
  
  showResult(applicableCities) {

    // $('.results').text(applicableCities[0].name)
    // $('.results').val("helo")
  }

}

/*PSEUDO FUNCTION FOR FILTER LOGIC

  let city_id = cityTemps[cityId];
  let val;

  if selectedMonth[id] === cityTemps[monthId], show results.

  city_id = selectedMonth[id];



  if selectedMonth[id] === cityTemps[monthId]
    &&
      if ((selectedTemp == avgCelcius) || (selectedTemp > avgCelcius + 5) || (selectedTemp < avgCelcius - 5)

    &&
      if ((selectedHumidity == avgHumidity) || (selectedHumidity > avgHUmidity + 10) || (selectedHumidity < avgHumidty - 10))
  
   ///selectedMonth[id] = cityTemps[cityId];

  return city_id = cities[name];



*/
