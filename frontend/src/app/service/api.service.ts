declare var process: any;

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const httpOptions = {
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

  private REST_API_ENTRYPOINT: string;

  /**
   * API service constructor
   * @param http
   */
  constructor(private http: HttpClient) {
    // @TODO: synchronize production and development environment
    // routing to the API endpoints.
    if (process.env.NODE_ENV === 'production') {
      this.REST_API_ENTRYPOINT = "https://127.0.0.1/api";
    } else {
      this.REST_API_ENTRYPOINT = "https://127.0.0.1/:8081";
    }
  }

  /**
   * HTTP GET operation
   * @param endpoint
   */
  public get(endpoint: string): Observable<any> {
    return this.http.get(this.REST_API_ENTRYPOINT + endpoint, httpOptions);
  }

  /**
   * HTTP POST operation
   * @param endpoint
   * @param data
   */
  public post(endpoint: string, data: any): Observable<any> {
    return this.http.post(this.REST_API_ENTRYPOINT + endpoint, data, httpOptions);
  }

  /**
   * HTTP PUT operation
   * @param endpoint
   * @param data
   */
  public put(endpoint: string, data: any): Observable<any> {
    return this.http.put(this.REST_API_ENTRYPOINT + endpoint, data, httpOptions);
  }

  /**
   * HTTP DELETE operation
   * @param endpoint
   */
  public delete(endpoint: string): Observable<any> {
    return this.http.delete(this.REST_API_ENTRYPOINT, httpOptions);

  }
}
