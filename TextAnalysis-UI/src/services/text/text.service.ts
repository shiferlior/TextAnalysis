import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Text } from './text';
import { Observable, throwError, from } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Metadata } from './metadata';
import { Phrase } from '../phrase/phrase';

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

  // POST Create text step 1
  createTextStep1(title: { title: string, path: string }): Observable<{ "recordset": [any] }> {
    return this.http.post<{ "recordset": [any] }>
      (`${this.baseurl}/text/stepOne/CreateTextEntity/`, JSON.stringify(title), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  // POST Create text step 2
  createTextStep2(loadText: { textId: number, row: string }): Observable<{ "recordset": [any] }> {
    return this.http.post<{ "recordset": [any] }>(`${this.baseurl}/text/stepTwo/addNewRow/`,
      JSON.stringify(loadText),
      this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }


  // POST Create text step 3
  createTextStep3(loadText: { textId: number }): Observable<{ "recordset": [any] }> {
    return this.http.post<{ "recordset": [any] }>(`${this.baseurl}/text/stepThree/applyUDP/`,
      JSON.stringify(loadText),
      this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  // POST metadata
  insertMetadata(metadata: Metadata): Observable<any> {
    return this.http.post<Text>(this.baseurl + '/text/' + metadata.textId + '/addMetadata/', JSON.stringify(metadata), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  // GET
  getTextByURL(path: string): Observable<{ text: string }> {
    alert('ccc ');
    return this.http.post<{ text: string }>(`${this.baseurl}/text/getText/`,JSON.stringify({path:path}),this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  // GET
  getTexts(): Observable<{ "recordset": [Text] }> {
    return this.http.get<{ "recordset": [Text] }>(this.baseurl + '/text/')
      .pipe(catchError(this.errorHandler));
  }


  // GET
  getTextsByPhrase(phrase): Observable<{ "recordset": [Text] }> {
    return this.http.get<{ "recordset": [Text] }>(this.baseurl + '/text/findByPhrase/' + phrase)
      .pipe(catchError(this.errorHandler));
  }

  // GET
  getTextsByMetadata(subjectKey: string, subjectValue: string): Observable<{ "recordset": [Text] }> {
    return this.http.get<{ "recordset": [Text] }>(this.baseurl + '/text/findByMetadata/' + subjectKey + '/' + subjectValue)
      .pipe(catchError(this.errorHandler));
  }

  //GET
  getAllPhrasesInAText(textid: number, from: number, to: number): Observable<{ "recordset": [Phrase] }> {
    return this.http.get<{ "recordset": [Phrase] }>
      (`${this.baseurl}/text/showAllPhrasesInAText/${from}/${to}/${textid}`)
      .pipe(catchError(this.errorHandler));
  }

  // // PUT
  // updateText(id, data): Observable<Text> {
  //   return this.http.put<Text>(this.baseurl + '/Texttracking/' + id, JSON.stringify(data), this.httpOptions)
  //     .pipe(
  //       catchError(this.errorHandl)
  //     )
  // }

  // // DELETE
  // deleteText(id) {
  //   return this.http.delete<Text>(this.baseurl + '/Texttracking/' + id, this.httpOptions)
  //     .pipe(
  //       retry(1),
  //       catchError(this.errorHandl)
  //     )
  // }


  // Error handling
  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${JSON.stringify(error.error.message)}`;
      alert(JSON.stringify(error));
      console.error(error);
    }
    alert(errorMessage);
    return throwError(errorMessage);
  }

}