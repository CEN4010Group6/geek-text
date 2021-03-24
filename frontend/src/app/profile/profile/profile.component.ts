import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { FlashMessageService } from 'src/app/flash-message/flash-message.service';
import { Level } from 'src/app/flash-message/level';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/users/user.service';

type GetFieldControl = AbstractControl | null | undefined;

@Component({
  selector: 'app-profile-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profileForm?: FormGroup;
  @Input() user: User | undefined;

  constructor(
    private readonly $formBuilder: FormBuilder,
    private readonly $apiService: ApiService,
    private readonly $userService: UserService,
    private readonly $flashMessage: FlashMessageService
  ) {}

  ngOnInit(): void {
    this.$userService.asObservable()
      .subscribe((user) => {
        this.profileForm = this.$formBuilder.group({
          firstName: [ user?.firstName, Validators.required ],
          middleName: [ user?.middleName],
          lastName: [ user?.lastName, Validators.required ],
          nickName: [ user?.nickName, Validators.required ],
          profilePicture: [ user?.profilePicture ]
        });
      });
  }

  public get firstName(): GetFieldControl {
    return this.profileForm?.get('firstName');
  }

  public get middleName(): GetFieldControl {
    return this.profileForm?.get('middleName');
  }

  public get lastName(): GetFieldControl {
    return this.profileForm?.get('lastName');
  }

  public get nickName(): GetFieldControl {
    return this.profileForm?.get('nickName');
  }

  public get profilePicture(): GetFieldControl {
    return this.profileForm?.get('profilePicture');
  }

  public onSubmit() {
    this.$apiService.put(`/users/${ this.user?.id }`, this.profileForm?.value)
      .subscribe(
        (user) => {
          this.$userService.load(user);
          this.$flashMessage.add('Successfully updated your profile.', Level.Success);
        },
        (err) => this.$flashMessage.add(err)
      );
  }

  public convertToDataURL(event: any) {
    if(event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const maxSize = 20971520;
      const allowedType = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
      const maxHeight = 256;
      const maxWidth = 256;

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
}
