import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";

import { HerokuDatabase } from "../db";
import { HerokuDatabaseService } from "../db.service";

@Component({
  selector: 'app-test-data',
  templateUrl: './test-data.component.html',
  styleUrls: ['./test-data.component.css']
})
export class TestDataComponent implements OnInit {
  herokuData: HerokuDatabase[];

  constructor(private herokuDatabaseService: HerokuDatabaseService) { }

  ngOnInit() {
    this.getHerokuData();
  }

  getHerokuData() {
    this.herokuDatabaseService.getHerokuData().subscribe(herokuData => {
      this.herokuData = herokuData["results"][0];
      console.log('herokuData', herokuData);
    })
  }

}
