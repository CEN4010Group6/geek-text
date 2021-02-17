import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ApiService } from '../api.service';
import { Author, Book } from '../models';

import { AuthorsService } from './authors.service';

@Component({
  selector: 'app-author',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {

  public author?: Author;

  constructor(
    private readonly $route: ActivatedRoute,
    private readonly $apiService: ApiService,
    private readonly $authorsService: AuthorsService
  ) {}

  ngOnInit(): void {
    this.$route.params.subscribe(params => {
      let httpParams = new HttpParams();

      httpParams = httpParams.set('include', btoa(JSON.stringify({
        books: true
      })));

      this.$apiService.get(`/authors/${params.authorId}`, httpParams)
        .subscribe(res => {console.log(res); this.author = res});
    })
  }

  public authorName(author: Author): string {
    return this.$authorsService.authorName(author);
  }
}
