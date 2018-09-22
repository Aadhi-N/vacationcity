import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

import { MessageService } from "./message.service";
import { Observable, of } from "rxjs";
import { Season } from "./season";

@Injectable({
  providedIn: 'root'
})
export class SeasonService {
  private seasonsUrl = "api/seasons";

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.add(`SeasonService: ${message}`);
  }

  getSeasons(): Observable<Season[]> {
    return this.http.get<Season[]>(this.seasonsUrl)
    .pipe(
        tap(seasons => this.log("fetched seasons")),
        catchError(this.handleError("getSeasons", []))
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
