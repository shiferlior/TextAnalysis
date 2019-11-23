import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgbPaginationNumber } from '@ng-bootstrap/ng-bootstrap';
import { RowStats } from './rowStats';
import { PhraseStats } from './phraseStats';



@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) { }


  // Base url
  baseurl = 'http://localhost:3000';
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  // GET
  getStatsForPhrase(phrase: { phrase: string }): Observable<{ recordset: [PhraseStats] }> {
    return this.http.get<{ recordset: [PhraseStats] }>
      (`${this.baseurl}/stats/Phrase/${phrase.phrase}`)
      .pipe(catchError(this.errorHandler));
  }

  // GET
  getStatsForRow(rowLocation: { rowNum: number, textId: number }): Observable<{ recordset: [RowStats] }> {
    return this.http.get<{ recordset: [RowStats] }>
      (`${this.baseurl}/stats/Row/${rowLocation.rowNum}/Text/${rowLocation.textId}`)
      .pipe(catchError(this.errorHandler));
  }

  // Error handling
  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${JSON.stringify(error.error.message)}`;
    }
    alert(errorMessage);
    return throwError(errorMessage);
  }
}
