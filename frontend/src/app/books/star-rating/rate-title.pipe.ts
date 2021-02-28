import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rateTitle'
})
export class RateTitlePipe implements PipeTransform {

  public transform(val: number = 0, titles?: string[]): string | number {
    return (titles) ? titles[val] : val + 1;
  }

}
