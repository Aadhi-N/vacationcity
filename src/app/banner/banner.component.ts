import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  env = environment;

  getStartedClicked = true;

  constructor() { }

  ngOnInit() {
    
  }

  getStarted () {
    this.getStartedClicked = false;
  }
 
 
}
