import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarRatingComponent } from 'ng-starrating';
import { ApiService } from 'src/app/api.service';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-book-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  public book?: Book;
  public starValue = 5;
  public totalstars = 5;
  public readFlag = false;

  constructor(
    private readonly $router: ActivatedRoute,
    private readonly $api: ApiService
  ) {}

  public ngOnInit(): void {
    this.$router.params.subscribe(params => {
      this.$api.get(`/books/${ params.bookId }`)
        .subscribe(res => this.book = res);
    });
  }

  public onRate($event:{
    oldValue: any,
    newValue: any,
    starRating: StarRatingComponent}) {
  }
}
