import { ArgumentMetadata, HttpStatus, Injectable, Optional, ParseIntPipeOptions, PipeTransform } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  protected exceptionFactory: (error: string) => any;

  constructor(@Optional() options?: ParseIntPipeOptions) {
    options = options || {};
    const { exceptionFactory, errorHttpStatusCode = HttpStatus.BAD_REQUEST } = options;

    this.exceptionFactory = exceptionFactory || (error => new HttpErrorByCode[errorHttpStatusCode](error));
  }
  /**
   *
   * @param value
   */
  public async transform(value: string | undefined, metadata: ArgumentMetadata): Promise<number | undefined> {
    if(!value || value.length === 0) {
      return undefined;
    }

    const isNumeric = ['string', 'number'].includes(typeof value) &&
      !isNaN(parseFloat(value)) &&
      isFinite(value as any);

      if(!isNumeric) {
        throw this.exceptionFactory(
          'Validation failed (numeric string is expected)'
        );
      }

      return parseInt(value, 10);
  }
}
