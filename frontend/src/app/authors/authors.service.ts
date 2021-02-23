import { Injectable } from '@angular/core';

import { Author } from '../models/author';

@Injectable()
export class AuthorsService {

  constructor() {}

  public authorName(author: Author): string {
    if(author.middleName) {
      return `${ author.firstName } ${ author.middleName } ${ author.lastName }`;
    } else {
      return `${ author.firstName } ${ author.lastName }`;
    }
  }
}
