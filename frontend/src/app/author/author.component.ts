import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ApiService } from '../api.service';
import { Author } from '../models/author';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {

  private author: Author = {} as Author;

  constructor(
    private $route: ActivatedRoute,
    private $apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.$route.params.subscribe(params => {
      this.$apiService.get(`/authors/${params.authorId}`)
        .subscribe(res => this.author = res);
    })
  }

}
