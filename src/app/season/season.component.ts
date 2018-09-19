import { Component, OnInit } from '@angular/core';
import { Season } from "../season";
import { SeasonService } from "../season.service";
import { DataService } from "../data.service";


@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css'],
})
export class SeasonComponent implements OnInit {
  seasons: Season[];
  seasonSelected: string;
  message: string;
  season: string;

  constructor(private seasonService: SeasonService, private data: DataService) { }

  ngOnInit() {
    this.getSeasons();
    this.seasonSelected = "Winter";
    this.data.currentMessage.subscribe(message => this.message = message);

    this.data.seasonMessage.subscribe(season => this.season = season)
  }

  //DISPLAYS LIST OF SEASONS FROM DATA SOURCE
   getSeasons(): void {
    this.seasons = this.seasonService.getSeasons();
  }

  onSeasonSelected(val:any) {
    this.season = val;
    this.sendSelectedSeason(this.season);
  }

  sendSelectedSeason(val:any) {
    this.data.changeSeason(this.season);
  }

}
