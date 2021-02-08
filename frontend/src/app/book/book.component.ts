import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  public bookId = '';

  constructor(
    private $route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.$route.params.subscribe(params => {
      this.bookId = params.bookId;
    });
  }

}
