import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserCredentialsStorageService } from '../auth/user-credentials-storage.service';

@Injectable()
export class HttpProviderService {

  constructor(private http: Http, private userCredentialsStorage: UserCredentialsStorageService) {
  }

  getBackendEndpointUrl(): string {
    return 'http://127.0.0.1:8000';
  }

  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    const resultUrl = this.getFullUrl(url);
    return this.http.get(resultUrl, this.addSecurityHeaders(options)).map(this.extractData).catch(this.handleError);
  }

  post(url: string, body: object, options?: RequestOptionsArgs): Observable<any> {
    const fullUrl = this.getFullUrl(url);
    return this.http.post(fullUrl, body || {}, this.addSecurityHeaders(options))
               .map(this.extractData)
               .catch(this.handleError);
  }

  private getFullUrl(url: string) {
    const baseUrl = this.getBackendEndpointUrl();
    const resultUrl = baseUrl + url;
    return resultUrl;
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

  private addSecurityHeaders(requestOptions: RequestOptionsArgs) {
    const options = requestOptions || new RequestOptions();
    const headers = options.headers || new Headers();
    options.headers = headers;
    const credentials = this.userCredentialsStorage.loadStoredCredentials();
    if (credentials != null) {
      headers.append('Authorization', 'Token ' + credentials.token);
    }
    return options;
  }
}
