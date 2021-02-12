import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { LoggerService } from './logger.service';
import { ApiService } from './api.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ ApiService ]
    });
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
