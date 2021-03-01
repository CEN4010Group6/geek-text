export class BaseDTO {
  constructor(merge: any) {
    Object.assign(this, merge);
  }
}
