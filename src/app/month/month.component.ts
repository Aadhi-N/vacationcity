import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { DataService } from "../data.service";

import { Month } from "../month";
import { MonthService } from "../month.service";

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css'],
})
export class MonthComponent implements OnInit {
   months: Month[];
   monthSelected: string;

   message: string;
   season: string;

  constructor(private monthService: MonthService, private data: DataService) { }

  ngOnInit() {
    this.getMonths();
    this.monthSelected = "September"

    //communicating and displaying value of month/season selected across components
    this.data.currentMessage.subscribe(message => this.message = message);

    this.data.seasonMessage.subscribe(season => this.season = season);
  }

  //DISPLAYS LIST OF MONTHS FROM DATA SOURCE
   getMonths(): void {
    this.monthService.getMonths()
      .subscribe(months => this.months = months);
  }

  onMonthSelected(val:any) {
    this.message = val;
    //web api or any other logic
    this.sendSelectedMonth(this.message);
  }

  sendSelectedMonth(val: any) {
    console.log(val, 'val')
    this.data.changeMessage(this.message);
  }
}
