import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SendMailInfo } from '../../shared/dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  constructor(private http: HttpClient) { }
  private endpoint = environment.dynamic.mailSendURL;

  sendMail(body: SendMailInfo): Observable<SendMailInfo> {
    let auth_header = 'BASIC ' + environment.dynamic.mailSendKey;

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': auth_header
      })
    };
    return this.http.post<SendMailInfo>(this.endpoint, body, httpOptions)
      .pipe(
        catchError(err => { throw 'error in source. Details: ' + err.message; })
      );
  }
}
