import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiService } from '../api.service';
import { Author } from '../models/author';

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
    private readonly $router: Router,
    private readonly $apiService: ApiService,
    private readonly $authorsService: AuthorsService
  ) {}

  public ngOnInit(): void {
    this.$route.params.subscribe(async params => {
      let httpParams = new HttpParams();

      const select = {
        firstName: true,
        middleName: true,
        lastName: true,
        description: true,
        books: {
          select: {
            id: true,
            title: true,
            genres: true,
            price: true,
            reviews: true,
            coverUrl: true,
            coverDataUri: true
          }
        }
      }

      httpParams = httpParams.set('select', await this.$apiService.prepareJsonForApi(select));

      this.$apiService.get(`/authors/${params.authorId}`, httpParams)
        .subscribe(res => this.author = res);
    })
  }

  public async navigate(id: string) {
    await this.$router.navigate(['/books', id]);
  }

  public authorName(author: Author): string {
    return this.$authorsService.authorName(author);
  }
}
