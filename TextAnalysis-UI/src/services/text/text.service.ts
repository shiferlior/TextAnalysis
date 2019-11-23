import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Text } from './text';
import { Observable, throwError, from } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Metadata } from './metadata';

@Injectable({
  providedIn: 'root'
})
export class TextService {

  // Base url
  baseurl = 'http://localhost:3000';
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  // POST
  createText(data): Observable<Text> {
    return this.http.post<Text>(this.baseurl + '/text/', JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandl)
      );
  }
  // POST metadata
  insertMetadata(metadata: Metadata): Observable<any> {
    return this.http.post<Text>(this.baseurl + '/text/' + metadata.textId + '/addMetadata/', JSON.stringify(metadata), this.httpOptions)
      .pipe(catchError(this.errorHandl));
  }

  // GET
  getTexts(): Observable<{ "recordset": [Text] }> {
    return this.http.get<{ "recordset": [Text] }>(this.baseurl + '/text/')
      .pipe(
        catchError(this.errorHandl)
      );
  }


  // GET
  getTextsByPhrase(phrase): Observable<{ "recordset": [Text] }> {
    return this.http.get<{ "recordset": [Text] }>(this.baseurl + '/text/findByPhrase/' + phrase)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  // GET
  getTextsByMetadata(subjectKey: string, subjectValue: string): Observable<{ "recordset": [Text] }> {
    return this.http.get<{ "recordset": [Text] }>(this.baseurl + '/text/findByMetadata/' + subjectKey + '/' + subjectValue)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  //GET
  getAllPhrasesInAText(textid: number): Observable<{ "recordset": [Text] }> {
    return this.http.get<{ "recordset": [Text] }>(this.baseurl + '/text/showAllPhrasesInAText/' + textid + '/')
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  // PUT
  updateText(id, data): Observable<Text> {
    return this.http.put<Text>(this.baseurl + '/Texttracking/' + id, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  // DELETE
  deleteText(id) {
    return this.http.delete<Text>(this.baseurl + '/Texttracking/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  // Error handling
  errorHandl(error) {
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