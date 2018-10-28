import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from "./in-memory-data.service";

import { AppRoutingModule } from './app-routing.module';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { MessagesComponent } from './messages/messages.component';
import { InputFormComponent } from './input-form/input-form.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { FooterComponent } from './footer/footer.component';
import { MapComponent } from './map/map.component';

import { AgmCoreModule } from '@agm/core';
import { TestDataComponent } from './test-data/test-data.component';

// import { apikey } from './apikey';

import { environment } from "../environments/environment";

console.log('from module', environment.google_maps_key)
@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    MessagesComponent,
    InputFormComponent,
    SearchResultsComponent,
    FooterComponent,
    MapComponent,
    TestDataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    //   ),
    AgmCoreModule.forRoot({
      apiKey: environment.google_maps_key 
    }),
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
