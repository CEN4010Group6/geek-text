import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { List } from 'immutable';


import { ApiService } from '../../api.service';
import { Book } from '../../models/book';
import { UserService } from 'src/app/users/user.service';
import { FlashMessageService } from 'src/app/flash-message/flash-message.service';

@Component({
  selector: 'app-book-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  public reviewForm?: FormGroup;
  public book?: Book;
  public userId?: string;
  public rating: number = 5;
  private _titles = List(['Poor', 'Below Average', 'Average', 'Above Average', 'Excellent']);

  constructor(
    private readonly $activatedRoute: ActivatedRoute,
    private readonly $router: Router,
    private readonly $api: ApiService,
    private readonly $formBuilder: FormBuilder,
    private readonly $userService: UserService,
    private readonly $flashService: FlashMessageService
  ) {}

  public ngOnInit(): void {
    this.$activatedRoute.params.subscribe(params => {
      this.$api.get(`/books/${ params.bookId }`)
        .subscribe(res => this.book = res);
    });

    this.userId = this.$userService.user?.id;

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
    const submitData = {
      value: this.rating,
      postedAs: this.reviewForm?.value?.postAs,
      description: this.reviewForm?.value?.description,
      userId: this.userId,
      bookId: this.book?.id
    }

     // submit reviews data to backend
    this.$api.post('/reviews', submitData).subscribe(
      (res) => this.$router.navigate(['..'], { relativeTo: this.$activatedRoute }),
      (error) => this.$flashService.add(error)
    );
  }

  public get titles(): string[] {
    return this._titles.toArray();
  }
}
