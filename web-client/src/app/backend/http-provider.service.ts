import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserCredentialsStorageService } from '../auth/user-credentials-storage.service';
import { AlertsService } from '../shared/alerts.service';

@Injectable()
export class HttpProviderService {

  static extractListMap<T>(transformer: (data: any) => T): (data: any) => T[] {
    return (data: any) => {
      const results = data.results || [];
      return results.map(transformer);
    }
  }

  constructor(private http: Http,
              private userCredentialsStorage: UserCredentialsStorageService,
              private alerts: AlertsService) {
  }

  getBackendEndpointUrl(): string {
    return '/api';
  }

  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    const resultUrl = this.getFullUrl(url);
    return this.http.get(resultUrl, this.addSecurityHeaders(options))
               .map(this.extractData)
               .catch(error => this.handleError(error));
  }

  post(url: string, body: object, options?: RequestOptionsArgs): Observable<any> {
    const fullUrl = this.getFullUrl(url);
    return this.http.post(fullUrl, body || {}, this.addSecurityHeaders(options))
               .map(this.extractData)
               .catch(error => this.handleError(error));
  }

  put(url: string, body: object, options?: RequestOptionsArgs): Observable<any> {
    const fullUrl = this.getFullUrl(url);
    return this.http.put(fullUrl, body || {}, this.addSecurityHeaders(options))
               .map(this.extractData)
               .catch(error => this.handleError(error));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    const resultUrl = this.getFullUrl(url);
    return this.http.delete(resultUrl, this.addSecurityHeaders(options))
               .map(this.extractData)
               .catch(error => this.handleError(error));
  }

  private getFullUrl(url: string) {
    const baseUrl = this.getBackendEndpointUrl();
    return baseUrl + url;
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
    this.alerts.showError(errMsg);
    return Observable.throw({ errMsg, status });
  }

  private addSecurityHeaders(requestOptions: RequestOptionsArgs) {
    const options = requestOptions || new RequestOptions();
    const headers = options.headers || new Headers();
    options.headers = headers;
    const credentials = this.userCredentialsStorage.loadStoredCredentials();
    if (credentials != null && headers.get('Authorization') === null) {
      headers.append('Authorization', `${credentials.tokenType} ${credentials.token}`);
    }
    return options;
  }

}
