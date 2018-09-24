import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

declare var $: any;

import { Month } from "../month";
import { MonthService } from "../month.service";

import { City } from "../city";
import { CityTemp } from "../cityTemp";
import { CityService } from "../city.service";

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
  selectedMonth: string;
  selectedTemp: number;
  selectedHumidity: number;

  cities: City[];
  cityTemps: CityTemp[];

  temps: Temp[];

  humidity: Humidity[];


  constructor(private monthService: MonthService, private cityService: CityService, private tempService: TempService, private humidityService: HumidityService) { }

  ngOnInit() {
    this.getMonths();
    this.getCities();
    this.getTemps();
    this.getHumidity();
    // this.showDropdown();
  }

  ngAfterViewInit() {
    this.tempSlider(event);
    this.humiditySlider(event);
  }

  //DISPLAYS LIST OF MONTHS FROM DATA SOURCE
   getMonths(): void {
    this.monthService.getMonths()
      .subscribe(months => this.months = months);
  }

  // onMonthSelected(val:any) {
  //   console.log('month selected', val)
  //   this.month = val;
  //   //web api or any other logic
  //   // this.sendSelectedMonth(this.month);
  // }

  getCities(): void {
    this.cityService.getCities()
      .subscribe(cities => {
        this.cities = cities
      })
  }

  getTemps(): void {
    this.tempService.getTemps()
      .subscribe(temps => {this.temps = temps})
  }

  getHumidity(): void {
    this.humidityService.getHumidity()
      .subscribe(humidity => {this.humidity = humidity; console.log('what is humidity', humidity)
      })
  }

  // showDropdown(): void {
  //   $('.ui.dropdown')
  //     .dropdown()
  //   ;
  // }

  onMonthClick(event): void {
    this.selectedMonth = event.target.value;
  }

  tempSlider(event): void {
    this.selectedTemp = event;
  }

  humiditySlider(event): void {
    this.selectedHumidity = event;
  }

}
