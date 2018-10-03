import { Component, OnInit, ViewChild } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { apikey } from "apikey"

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat: number = 51.678418;
  lng: number = 7.809007;
  apikey: string = apikey.key;

  constructor() { }

  ngOnInit() {
    console.log(this.apikey)
  }

}
