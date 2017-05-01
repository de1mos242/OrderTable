import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpProviderService {

  constructor(private http: Http) {
  }

  getBackendEndpointUrl(): string {
    return 'http://127.0.0.1:8000';
  }

  get(url: string): Observable<any> {
    const baseUrl = this.getBackendEndpointUrl();
    const resultUrl = baseUrl + url;
    return this.http.get(resultUrl).map(this.extractData).catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
