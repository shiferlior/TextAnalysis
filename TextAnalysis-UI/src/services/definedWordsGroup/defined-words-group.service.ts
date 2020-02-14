import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { WordsGroup } from './wordsGroup';
import { Phrase } from '../phrase/phrase';


@Injectable({
  providedIn: 'root'
})
export class DefinedWordsGroupService {

  constructor(private http: HttpClient) { }


  // Base url
  baseurl = 'http://localhost:3000';
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

   // POST DefinedGroup
   importUserDefinedGroups(xml: string): Observable<any> {
    return this.http.post<any>(`${this.baseurl}/xml/ImportUserDefinedGroups`, JSON.stringify({xml}), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  // POST DefinedGroup
  importUserDefinedPhrases(xml: string): Observable<any> {
    return this.http.post<any>(`${this.baseurl}/xml/ImportUserDefinedPhrases`, JSON.stringify({xml}), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  // POST DefinedGroup
  importIngestedTexts(xml: string): Observable<any> {
    return this.http.post<any>(`${this.baseurl}/xml/ImportIngestedTexts`, JSON.stringify({xml}), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  // GET
  exportUserDefinedGroups(): Observable<{ "recordset": { "XML_F52E2B61-18A1-11d1-B105-00805F49916B": string }}> {
    return this.http.get<{ "recordset": { "XML_F52E2B61-18A1-11d1-B105-00805F49916B": string }}>
      (`${this.baseurl}/xml/ExportUserDefinedGroups/`)
      .pipe(catchError(this.errorHandler));
  }

  // GET
  exportUserDefinedPhrases(): Observable<{ "recordset": { "XML_F52E2B61-18A1-11d1-B105-00805F49916B": string }}> {
    return this.http.get<{ "recordset": { "XML_F52E2B61-18A1-11d1-B105-00805F49916B": string }}>
      (`${this.baseurl}/xml/ExportUserDefinedPhrases/`)
      .pipe(catchError(this.errorHandler));
  }

  // GET
  exportIngestedTexts(): Observable<{ "recordset": { "XML_F52E2B61-18A1-11d1-B105-00805F49916B": string }}> {
    return this.http.get<{ "recordset": { "XML_F52E2B61-18A1-11d1-B105-00805F49916B": string }}>
      (`${this.baseurl}/xml/ExportIngestedTexts/`)
      .pipe(catchError(this.errorHandler));
  }

  // GET
  getUserDefinedGroupsList(): Observable<{ "recordset": [WordsGroup] }> {
    return this.http.get<{ "recordset": [WordsGroup] }>
      (`${this.baseurl}/definedWordsGroup/`)
      .pipe(catchError(this.errorHandler));
  }

  // DELETE
  deleteAllUserDefinedWordsGroup(): Observable<{ "recordset": [WordsGroup] }> {
    return this.http.delete<{ "recordset": [WordsGroup] }>
      (`${this.baseurl}/definedWordsGroup/DeleteAllUserDefinedWordsGroup`)
      .pipe(catchError(this.errorHandler));
  }

  // GET
  getPhrasesDefinedGroupsAsIndex(phrasesGroup: {phrasesGroupId:number,textId:number}): Observable<{ "recordset": [Phrase] }> {
    return this.http.get<{ "recordset": [Phrase] }>
      (`${this.baseurl}/definedWordsGroup/${phrasesGroup.phrasesGroupId}/${phrasesGroup.textId}`)
      .pipe(catchError(this.errorHandler));
  }

   // POST DefinedGroup
   createUserDefinedGroup(groupName: {groupName:string}): Observable<any> {
    return this.http.post<any>(`${this.baseurl}/definedWordsGroup/`, JSON.stringify(groupName), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
   // POST AddDefinedGroup
   addPhraseToUserDefinedGroup(details: {groupId:number,phrase: string}): Observable<any> {
    return this.http.post<any>(`${this.baseurl}/definedWordsGroup/AddPhraseToUserDefinedGroup/`, JSON.stringify(details), this.httpOptions)
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
