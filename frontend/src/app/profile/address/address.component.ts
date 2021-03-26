import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { List } from 'immutable';

import { FlashMessageService } from '../../flash-message/flash-message.service';
import { ApiService } from '../../api.service';

import { Address } from '../../models/address';

@Component({
  selector: 'app-profile-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  @Input() public userId: string | undefined = '';

  public addressForm: FormGroup;

  private _addresses: List<Address> = List();

  constructor(
    private readonly $apiService: ApiService,
    private readonly $formBuilder: FormBuilder,
    private readonly $flashMessage: FlashMessageService
  ) {
    this.addressForm = $formBuilder.group({
      street: ['', Validators.required ],
      apartmentOrUnit: '',
      city: [ '', Validators.required ],
      state: [ '', [Validators.required, Validators.minLength(2), Validators.maxLength(2)] ],
      country: [ 'United States', Validators.required ],
      zipcode: [ '', [ Validators.required, Validators.minLength(5) ]],
      isPreferredAddress: false
    });
  }

  ngOnInit(): void {
    let httpParams = new HttpParams();

    const select = this.$apiService.prepareJsonForApi({
      shippingAddresses: true
    });

    httpParams = httpParams.set('select', select);

    this.$apiService.get(`/users/${ this.userId }`, httpParams)
      .subscribe((res) => {
        this._addresses = List(res.shippingAddresses);
      });
  }

  public get addresses(): Address[] {
    return this._addresses.toArray();
  }

  public onSubmit() {
    let values = this.addressForm.value;

    Object.defineProperty(values, 'userShippingAddressId', {
      value: this.userId,
      enumerable: true
    });

    this.$apiService.post('/addresses', values)
      .subscribe((res) => {
        this._addresses = this._addresses.push(res);
      },
      (err) => this.$flashMessage.add(err));
  }

  public deleteAddress(id: string) {
    this.$apiService.delete(`/addresses/${ id }`)
      .subscribe((res) => {
        this._addresses = this._addresses.filter((val) => {
          return val.id != res.id
        });
      },
      (err) => this.$flashMessage.add(err));
  }

}
