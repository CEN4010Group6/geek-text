declare var process: any;

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const defaultHttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

/**
 * API communication service.
 *
 * @TODO: seperate calls out into specifics for each module
 * @TODO: add interceptor for authentication
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private REST_API_ENTRYPOINT: string = process.env.REST_API_ENTRYPOINT;

  /**
   * API service constructor
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   * HTTP GET operation
   * @param endpoint
   */
  public get(endpoint: string, params?: HttpParams): Observable<any> {
    const options = { params: params, ...defaultHttpOptions };
    return this.http.get(this.REST_API_ENTRYPOINT + endpoint, options);
  }

  /**
   * HTTP POST operation
   * @param endpoint
   * @param data
   */
  public post(endpoint: string, data: any, params?: HttpParams): Observable<any> {
    const options = { params: params, ...defaultHttpOptions };
    return this.http.post(this.REST_API_ENTRYPOINT + endpoint, data, options);
  }

  /**
   * HTTP PUT operation
   * @param endpoint
   * @param data
   */
  public put(endpoint: string, data: any, params?: HttpParams): Observable<any> {
    const options = { params: params, ...defaultHttpOptions };
    return this.http.put(this.REST_API_ENTRYPOINT + endpoint, data, options);
  }

  /**
   * HTTP DELETE operation
   * @param endpoint
   */
  public delete(endpoint: string, params?: HttpParams): Observable<any> {
    const options = { params: params, ...defaultHttpOptions };
    return this.http.delete(this.REST_API_ENTRYPOINT, options);
  }

  public async prepareJsonForApi(obj: Object): Promise<string > {
    return btoa(JSON.stringify(obj));
  }
}
