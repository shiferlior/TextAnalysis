import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Phrase } from './phrase';

@Injectable({
  providedIn: 'root'
})
export class PhraseService {

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
  getIndexForPhrase(phrase: { phrase: string, textId: number }): Observable<{ "recordset": [Phrase] }> {
    return this.http.get<{ "recordset": [Phrase] }>(this.baseurl + '/phrase/GetIndexForPhrase/' + phrase.phrase + '/' + phrase.textId)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  // GET
  getPhraseByRowLocation(phrase: {
    textId: number,
    rowNum: number,
    wordInRow: number
  }): Observable<{ "recordset": [Phrase] }> {
    return this.http.get<{ "recordset": [Phrase] }>(
      `${this.baseurl}/phrase/GetPhraseByRowLocation/${phrase.textId}/${phrase.rowNum}/${phrase.wordInRow}`)
      .pipe(
        catchError(this.errorHandler)
      )
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