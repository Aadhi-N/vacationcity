import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

import { MessageService } from "./message.service";
import { Observable, of } from "rxjs";
import { forkJoin } from "rxjs";
import { City } from "./city";
import { Temp } from "./temp";


@Injectable({
  providedIn: 'root'
})
export class CityService {
  private citiesUrl = "api/cities";
  private tempsUrl = "api/temps";
 
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.add(`CityService: ${message}`);
  }

  // combineData() {
  //   let cityData = this.http.get(this.citiesUrl);
  //   let tempData = this.http.get(this.tempsUrl);

  //   forkJoin([cityData, tempData]).subscribe(results => {
  //     (results[0] as any).id = results[1];
  //     this.loadedCity = results[0]
  //   });

  //   this.getCities()
  // }


  // getCities(): Observable<City[]>{
  //   return this.http.get(this.citiesUrl)
  //     .pipe(
  //         tap(cities => this.log("fetched cities")),
  //         catchError(this.handleError("getCities", []))
  //     );
  // }

  

  getCities(): Observable<any[]>{
    let cityData = this.http.get(this.citiesUrl)
    let tempData = this.http.get(this.tempsUrl)
      return forkJoin([cityData, tempData])
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
