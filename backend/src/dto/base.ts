export class BaseDTO {
  constructor(merge: any) {
    for(const prop in merge) {
      if(this.hasOwnProperty(prop)) {
        this[prop] = merge[prop];
      }
    }
  }
}
