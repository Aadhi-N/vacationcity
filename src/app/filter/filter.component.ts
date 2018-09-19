import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  message: string;
  season: string;
  seasonId: number;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);

    this.data.seasonMessage.subscribe(season => this.season = season);
  }

  

  onSubmit() {
    console.log(this.season, 'value of select')
  }

  // filterById(): void {

  // }

}
