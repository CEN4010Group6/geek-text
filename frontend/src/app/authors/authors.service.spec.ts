import { TestBed } from '@angular/core/testing';

import { AuthorsService } from './authors.service';

describe('AuthorService', () => {
  let service: AuthorsService;

  const author = {
    id: 'a',
    description: '',
    firstName: 'John',
    middleName: 'Quincy',
    lastName: 'Doe',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should correctly display book authors names', () => {
    expect(service.authorName(author)).toBe('John Quincy Doe');
  });
});
