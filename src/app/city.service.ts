import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

import { MessageService } from "./message.service";
import { Observable, of } from "rxjs";
import { forkJoin } from "rxjs";
import { City } from "./city";
import { CityTemp } from "./cityTemp";


@Injectable({
  providedIn: 'root'
})
export class CityService {
  private citiesUrl = "api/cities";
  private cityTempsUrl = "api/cityTemps";
 
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.add(`CityService: ${message}`);
  }

  getCities(): Observable<any[]>{
    let cityData = this.http.get(this.citiesUrl)
    let cityTempData = this.http.get(this.cityTempsUrl)
      return forkJoin([cityData, cityTempData])
      .pipe(
          tap(cities => this.log("fetched cities")),
          catchError(this.handleError("getCities", []))
      );
  }


  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
