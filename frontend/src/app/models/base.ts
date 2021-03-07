export class BaseModel {
  constructor(merge?: any) {
    if(merge) {
      Object.assign(this, merge);
    }
  }
}
