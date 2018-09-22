import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { forkJoin } from "rxjs";

import { City } from "../city";
import { Temp } from "../temp";
import { CityService } from "../city.service";
// import { TempService } from "../temp.service";

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  cities: City[];
  temps: Temp[];
  loadedCity: {}

  constructor(private cityService: CityService) { }

  ngOnInit() {
    this.getCities();
    // this.getTemps();
    // this.combineData();
  }

  //displays list of cities from data source
  getCities(): void {
    this.cityService.getCities()
      .subscribe(cities => {
        this.cities = cities
        console.log('cities list', this.cities)
        
        }))
  }

  // getTemps(): void {
  //   this.tempService.getTemps()
  //   .subscribe(temps => {this.temps = temps, console.log('temps list', this.temps)})
  // } 

  // combineData(): void {
  //     forkJoin([this.cities, this.temps]).subscribe(results => {
  //     (results[0] as any).id = results[1];
  //     this.loadedCity = results[0];
  //     console.log('loadedcity', this.loadedCity)
  //   });
  // }

}
