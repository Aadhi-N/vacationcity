import { Component } from '@angular/core';
import { DataService } from "./data.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]

})
export class AppComponent {
  title = 'My Vacation City';

   month:string;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.monthMessage.subscribe(month => this.month = month)
  }
}