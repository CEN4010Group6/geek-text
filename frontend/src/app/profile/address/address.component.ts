import { Component, Input, OnInit } from '@angular/core';

import { User } from '../../models/user';

@Component({
  selector: 'app-profile-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  @Input() user: User | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
