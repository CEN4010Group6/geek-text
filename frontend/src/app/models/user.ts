import { BaseModel } from "./base";

export class User extends BaseModel {
  [key: string]: any;
  id?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  nickName?: string;
  profilePicture?: string;

  constructor(merge: any) {
    super(merge);
  }
}
