import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { ApiService } from '../../api.service';
import { Book } from '../../models/book';
import { Author } from '../../models/author';

@Component({
  selector: 'app-book-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Input() public title: string = '';
  @Input() public authors: Author[] = [];
  @Input() public isbn: number = 0;
  @Input() public description: string = '';
  @Input() public price: number = 0.00;
  @Input() public coverUrl?: string;

  constructor(private $api: ApiService) {}

  public ngOnInit(): void {}
}
