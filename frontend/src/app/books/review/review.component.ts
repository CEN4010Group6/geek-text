import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { List } from 'immutable';


import { ApiService } from '../../api.service';
import { Book } from '../../models/book';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-book-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  public reviewForm?: FormGroup;
  public book?: Book;
  public user: any;
  public userId: any;
  public rating: number = 5;
  private _titles = List(['Poor', 'Below Average', 'Average', 'Above Average', 'Excellent']);

  constructor(
    private readonly $router: ActivatedRoute,
    private readonly $api: ApiService,
    private readonly $formBuilder: FormBuilder,
    private readonly $userService: UserService
  ) {}

  public ngOnInit(): void {
    this.$router.params.subscribe(params => {
      this.$api.get(`/books/${ params.bookId }`)
        .subscribe(res => this.book = res);
    });

    this.user = this.$userService.user;
    this.userId = this.user?._value?.id || localStorage.getItem('userId');
    console.log('userId +++', this.userId);

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
    // console log form value before submit
    console.log('review form value', this.reviewForm?.value);
    const submitData = {
      value: this.rating,
      postedAs: this.reviewForm?.value?.postAs,
      description: this.reviewForm?.value?.description,
      userId: this.userId,
      bookId: this.book?.id
    }

    // submit reviews data to backend
    this.$api.post('/reviews', submitData).subscribe(
      (response) => console.log('review create response success case +++', response),
      (error) =>  console.log('review create error case ---', error));
 
  }

  public get titles(): string[] {
    return this._titles.toArray();
  }
}
