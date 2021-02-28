import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeAll(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ HttpClient ]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a method get', async () => {
    await expect(service.get).toBeDefined();

    const books: any[] = [];

    service.get('/books')
      .subscribe(async (b) => {
        await expect(b).toEqual([]);
      });

    const req = httpMock.expectOne('/api/books');
    await expect(req.request.method).toEqual('GET');

    req.flush(books);

    httpMock.verify();
  });

  it('should have a method post', async () => {
    expect(service.post).toBeDefined();
  });

  it('should have a method put', async () => {
    expect(service.put).toBeDefined();
  });

  it('should have a method delete', async () => {
    expect(service.delete).toBeDefined();
  });
});
