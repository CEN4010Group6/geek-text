import { Component, Input, OnInit } from '@angular/core';

import { Book } from '../../models/book';

@Component({
  selector: 'app-book-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() bookId: string;

  constructor() { }

  ngOnInit(): void {
  }

}
