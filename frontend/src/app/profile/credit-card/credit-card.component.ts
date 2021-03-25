import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { ApiService } from 'src/app/api.service';

import { User } from '../../models/user';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-profile-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit {

  @Input() user: User | undefined;

  public creditCardForm?: FormGroup;

  constructor(
    private readonly $formBuilder: FormBuilder,
    private readonly $apiService: ApiService,
    private readonly $userService: UserService
  ) { }

  public async ngOnInit(): Promise<void> {
    if(!this.user?.creditCards) {
      let httpParams = new HttpParams();

      const select = await this.$apiService.prepareJsonForApi({
        creditCards: true
      });

      httpParams = httpParams.set('select', select);
      this.$apiService.get(`/${ this.user?.id }`, httpParams)
        .subscribe((res) => {
          this.$userService.update(res);
        });
    }
  }

}
