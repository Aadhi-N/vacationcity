import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from "./in-memory-data.service";

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { FilterComponent } from './filter/filter.component';
import { FilterResultsComponent } from './filter-results/filter-results.component';
import { SeasonComponent } from './season/season.component';
import { MonthComponent } from './month/month.component';
import { MessagesComponent } from './messages/messages.component';
import { CityComponent } from './city/city.component';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    FilterComponent,
    FilterResultsComponent,
    SeasonComponent,
    MonthComponent,
    MessagesComponent,
    CityComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
      )
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
