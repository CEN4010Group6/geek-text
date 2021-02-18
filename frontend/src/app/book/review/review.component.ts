import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarRatingComponent } from 'ng-starrating';
import { ApiService } from 'src/app/api.service';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  public book: Book = {} as Book;
  starValue = 5;
  totalstars = 5;
  readFlag = false;


  constructor(private $api: ApiService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.router.snapshot.paramMap.get('bookId')?.toString();
    if (id) {
      this.$api.getBookById(id)
      .subscribe(res => this.book = res);
    }
  }

  onRate($event:{oldValue: any, newValue: any, starRating:StarRatingComponent}) {
      alert(`Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }

//

}
