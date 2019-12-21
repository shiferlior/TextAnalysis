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


  // GET
  getUserDefinedGroupsList(): Observable<{ "recordset": [WordsGroup] }> {
    return this.http.get<{ "recordset": [WordsGroup] }>
      (`${this.baseurl}/definedWordsGroup/`)
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
