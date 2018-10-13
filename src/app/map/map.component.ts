import { Component, OnInit, ViewChild } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { DataService } from "../data.service";

// import { apikey } from "../apikey"

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  displaySearchResults: any;

  centerLat: number = 43.332987;
  centerLng: number = 11.939059;
  testZoom: number = 2.1;
  previous: boolean;
  latLngBounds;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.searchResultMessage.subscribe(searchResult => {
      this.displaySearchResults = searchResult;
    });
  }

  clickedMarker(infoWindow) {
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infoWindow;
  }

  changeZoom(coordinates) {
    this.testZoom = 10;
    
    this.centerLat = Number(coordinates.latitude);
    this.centerLng = Number(coordinates.longtitude);
    console.log(typeof this.latLngBounds.lat)
  }

}
