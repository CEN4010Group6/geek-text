declare var process: any;

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Book } from './models/book';

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
    const options = { params: params, ...httpOptions };
    return this.http.get(this.REST_API_ENTRYPOINT + endpoint, httpOptions);
  }

  /**
   * HTTP POST operation
   * @param endpoint
   * @param data
   */
  public post(endpoint: string, data: any, params?: HttpParams): Observable<any> {
    const options = { params: params, ...httpOptions };
    return this.http.post(this.REST_API_ENTRYPOINT + endpoint, data, httpOptions);
  }

  /**
   * HTTP PUT operation
   * @param endpoint
   * @param data
   */
  public put(endpoint: string, data: any, params?: HttpParams): Observable<any> {
    const options = { params: params, ...httpOptions };
    return this.http.put(this.REST_API_ENTRYPOINT + endpoint, data, httpOptions);
  }

  /**
   * HTTP DELETE operation
   * @param endpoint
   */
  public delete(endpoint: string, params?: HttpParams): Observable<any> {
    const options = { params: params, ...httpOptions };
    return this.http.delete(this.REST_API_ENTRYPOINT, httpOptions);
  }

  /**
   * Get a book by its Id from the backend.
   * @param id The Id of the requested book.
   */
  public getBookById(id: string, params?: HttpParams): Observable<Book> {
    const options = { params: params, ...httpOptions };
    return this.http.get<Book>(
      this.REST_API_ENTRYPOINT + '/books/' + id,
      options
    );
  }
}
