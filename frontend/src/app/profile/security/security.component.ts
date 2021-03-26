import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { FlashMessageService } from 'src/app/flash-message/flash-message.service';
import { Level } from 'src/app/flash-message/level';
import { User } from 'src/app/models/user';

const passwordValidation = [
  Validators.required,
  Validators.minLength(6),
  Validators.maxLength(36)
];

@Component({
  selector: 'app-profile-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {

  @Input() public userId: string | undefined = '';

  public securityForm?: FormGroup;

  constructor(
    private readonly $formBuilder: FormBuilder,
    private readonly $apiService: ApiService,
    private readonly $flashMessage: FlashMessageService
  ) {
    this.securityForm = $formBuilder.group({
      newPassword: [ '', passwordValidation ],
      newPasswordConfirm: [ '', passwordValidation ],
      currentPassword: [ '', passwordValidation ]
    }, {
      validator: this.checkPasswords
    });
  }

  ngOnInit(): void {
  }

  public onSubmit() {
    this.$apiService.put(`/users/${ this.userId }/update-password`, this.securityForm?.value)
      .subscribe(
        (_user) => this.$flashMessage.add('Successfully updated password', Level.Success),
        (err) => this.$flashMessage.add(err)
      );
  }

  private checkPasswords(group: FormGroup) {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('newPasswordConfirm')?.value;

    return (password === confirmPassword) ? null : { passwordsNotEqual: true }
  }

}
