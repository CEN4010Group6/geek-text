import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { DateTime } from 'luxon';
import { List } from 'immutable';

import { ApiService } from '../../api.service';
import { User } from '../../models/user';
import { UserService } from '../../users/user.service';
import { CreditCard } from 'src/app/models/credit-card';

@Component({
  selector: 'app-profile-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit {

  @Input() public user: User | undefined;

  private _creditCards: List<CreditCard> = List();
  public creditCardForm?: FormGroup;

  constructor(
    private readonly $formBuilder: FormBuilder,
    private readonly $apiService: ApiService,
    private readonly $userService: UserService
  ) { }

  public async ngOnInit(): Promise<void> {
    let httpParams = new HttpParams();

    const select = await this.$apiService.prepareJsonForApi({
      creditCards: true
    });

    httpParams = httpParams.set('select', select);
    this.$apiService.get(`/users/${ this.user?.id }`, httpParams)
      .subscribe((res) => {
        this._creditCards = List(res.creditCards);
      });

    this.creditCardForm = this.$formBuilder.group({
      creditCardNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(19)
        ]
      ],
      ccv: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(4)
        ]
      ],
      expirationDate: [ '', Validators.required ],
      isPreferredCreditCard: false,
      nickName: [ '', Validators.max(16) ]
    });
  }

  public get creditCards(): CreditCard[] {
    return this._creditCards.toArray();
  }

  public onSubmit() {
    let values = this.creditCardForm?.value;

    const lastFour = values.creditCardNumber.substring(values.creditCardNumber.length - 4, values.creditCardNumber.length);

    Object.defineProperty(values, 'lastFourDigits', {
      value: parseInt(lastFour),
      enumerable: true
    });

    values.expirationDate = DateTime.fromISO(values.expirationDate).toISO();

    this.$apiService.post(`/credit-cards/${ this.user?.id }`, values)
      .subscribe((res) => {
        this._creditCards = this._creditCards.push(res);
        this.creditCardForm?.reset();
      });
  }

  public deleteCard(id: string) {
    this.$apiService.delete(`/credit-cards/${ id }`)
      .subscribe((res) => {
        console.log(res);
        this._creditCards = this._creditCards.filter((val) => {
          return val.id != res.id
        });
      });
  }
}
