import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { ApiService } from '../../api.service';
import { Author, Genre } from '../../models';

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
  @Input() public genre?: Genre[];

  public genreReal?: string;

  constructor(private $api: ApiService) {}

  public ngOnInit(): void {
    this.genreReal = this.genre?.map(val => val.name).join(', ');
  }
}
