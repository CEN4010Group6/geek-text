import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';

import { ApiService } from '../api.service';
import { UserService } from '../users/user.service';
import { User } from '../models/user';
import { FlashMessageService } from '../flash-message/flash-message.service';
import { Level } from '../flash-message/level';

const passwordValidation = [
  Validators.required,
  Validators.minLength(6),
  Validators.maxLength(36)
];

export enum TabState {
  Profile = 'profile',
  Security = 'security'
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profileForm?: FormGroup;
  public securityForm?: FormGroup;
  public user: User | undefined;
  private _activeTab = TabState.Profile

  public eTabState = TabState;

  constructor(
    private readonly $formBuilder: FormBuilder,
    private readonly $apiService: ApiService,
    private readonly $userService: UserService,
    private readonly $flashMessage: FlashMessageService,
  ) {
  }

  ngOnInit(): void {
    this.$userService.asObservable()
      .subscribe((user) => {
        this.user = user;

        this.profileForm = this.$formBuilder.group({
          firstName: [ user?.firstName, Validators.required ],
          middleName: [ user?.middleName],
          lastName: [ user?.lastName, Validators.required ],
          nickName: [ user?.nickName, Validators.required ],
          profilePicture: [ user?.profilePicture ]
        });
      });

    this.securityForm = this.$formBuilder.group({
      newPassword: ['', passwordValidation ],
      newPasswordConfirm: [ '', passwordValidation ],
      currentPassword: [ '', passwordValidation ]
    }, {
      validator: this.checkPasswords
    });
  }

  public isActiveTab(tab: string): boolean {
    return tab === this._activeTab;
  }

  public get activeTab(): TabState {
    return this._activeTab;
  }

  public set activeTab(str: TabState) {
    this._activeTab = str;
  }

  public onSubmitProfile() {
    this.$apiService.put(`/users/${ this.user?.id }`, this.profileForm?.value)
      .subscribe((user) => {
        this.$userService.load(user);
      });
  }

  public onSubmitSecurity() {
    this.$flashMessage.add('Currently not implemented', Level
    .Info);
  }

  public convertToDataURL(event: any) {
    if(event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const maxSize = 20971520;
      const allowedType = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
      const maxHeight = 64;
      const maxWidth = 64;

      if(file.size > maxSize) {
        this.$flashMessage.add(`Maximum profile picture file size allowed is ${ maxSize / 1000 } Mb. Given size was ${ file.size / 1000 } Mb`);
        return;
      }

      if(!allowedType.includes(file.type)) {
        this.$flashMessage.add('Only image types of jpeg, png, or gif are allowed');
        return;
      }

      const reader = new FileReader();

      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;

        image.onload = (rs: any) => {
          const height = rs.currentTarget['height'];
          const width = rs.currentTarget['width'];

          if(height > maxHeight || width > maxWidth) {
            this.$flashMessage.add(`Maxmium dimensions of a profile picture are ${maxHeight}px by ${maxWidth}px. Provided picture was ${height}px by ${width}px`)
            return;
          }

          this.profileForm?.patchValue({
            profilePicture: e.target.result
          });
        }
      }

      reader.readAsDataURL(file);
    }
  }

  private checkPasswords(group: FormGroup) {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('newPasswordConfirm')?.value;

    return (password === confirmPassword) ? null : { passwordsNotEqual: true }
  }

}
