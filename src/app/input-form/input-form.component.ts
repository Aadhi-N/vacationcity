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
  monthSelected: string;

  cities: City[];
  cityTemps: CityTemp[];

  temps: Temp[];

  humidity: Humidity[];

  month: string;


  constructor(private monthService: MonthService, private cityService: CityService, private tempService: TempService, private humidityService: HumidityService) { }

  ngOnInit() {
    this.getMonths();
    this.getCities();
    this.getTemps();
    this.getHumidity();
    this.showDropdown();
  }

  ngAfterViewInit() {
    this.showDropdown();
    this.tempSlider();
    this.humiditySlider();
    this.onSubmit();
    this.monthSelected();
  }

  //DISPLAYS LIST OF MONTHS FROM DATA SOURCE
   getMonths(): void {
    this.monthService.getMonths()
      .subscribe(months => this.months = months);
  }

  monthSelected(val:any) {
    console.log('month selected', val)
    this.month = val;
    //web api or any other logic
    // this.sendSelectedMonth(this.month);
  }

  getCities(): void {
    this.cityService.getCities()
      .subscribe(cities => {
        this.cities = cities
        // console.log('cities list', this.cities)
      })
  }

  getTemps(): void {
    this.tempService.getTemps()
      .subscribe(temps => {this.temps = temps})
  }

  getHumidity(): void {
    this.humidityService.getHumidity()
      .subscribe(humidity => {this.humidity = humidity
        // console.log('humidity list', this.humidity)
      })
  }

  showDropdown(): void {
    $('.ui.dropdown')
      .dropdown()
    ;
  }

  tempSlider(): void {
    let range = $('#range').val();
    let value = $('#value').val(range);
    $('#range').change(function(){
      let range2 = $('#value').val()
      $('#value').val(range2)
    })
    $('#value').keyup(function(){
      var value2 = $('#value').val()
      $("#range").val(value2)
    })

    console.log('tempSlider', range)
    this.onSubmit(range, null)
  }

  humiditySlider(): void {
    let humidityRange = $('#humidityRange').val();
    let humidityVal = $('#humidityVal').val(humidityRange);
    $('#humidityRange').change(function(){
      let humidityRange2 = $('#humidityVal').val()
      $('#humidityVal').val(humidityRange2)
    })
    $('#humidityVal').keyup(function(){
      var humidityVal2 = $('#humidityVal').val()
      $("#humidityRange").val(humidityVal2)
    })

    console.log('humidityRangeSlider', humidityRange)
    this.onSubmit(null, humidityRange)
  }

  onSubmit(range, humidityRange): void {
    console.log('onSubmit', range, humidityRange)
  }

}
