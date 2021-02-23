import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { List } from 'immutable';


import { ApiService } from '../../api.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  public reviewForm?: FormGroup;
  public book?: Book;
  public rating: number = 5;
  private _titles = List(['Poor', 'Below Average', 'Average', 'Above Average', 'Excellent']);

  constructor(
    private readonly $router: ActivatedRoute,
    private readonly $api: ApiService,
    private readonly $formBuilder: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.$router.params.subscribe(params => {
      this.$api.get(`/books/${ params.bookId }`)
        .subscribe(res => this.book = res);
    });

    this.reviewForm = this.$formBuilder.group({
      'rating': [5, Validators.required],
      'postAs': ['realName', Validators.required],
      'description': ['', Validators.required]
    });
  }

  public reset() {
    this.reviewForm?.reset();
  }

  public onSubmit() {
  }

  public get titles(): string[] {
    return this._titles.toArray();
  }
}
