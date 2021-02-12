import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { CustomErrorHandlerService } from './custom-error-handler.service';

describe('CustomErrorHandlerService', () => {
  let service: CustomErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ ApiService ]
    });
    service = TestBed.inject(CustomErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
