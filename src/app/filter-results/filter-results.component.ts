import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { CITIES } from "../mock-cities";
import { TEMPS } from "../mock-temps";
import { MONTHS } from "../mock-months";

@Component({
  selector: 'app-filter-results',
  templateUrl: './filter-results.component.html',
  styleUrls: ['./filter-results.component.css'],
})
export class FilterResultsComponent implements OnInit {
  cities = CITIES;
  temps = TEMPS;
  months = MONTHS;

  message: string;
  season: string;
  
  constructor(private data: DataService) { }

  ngOnInit() {
    //set to current Observable, and set its value to the current message
    this.data.currentMessage.subscribe(message => this.message = message);

    this.data.seasonMessage.subscribe(season => this.season = season);
  }

  newMessage() {
    // this.data.changeMessage("hello from filter-results component");
  }

}
