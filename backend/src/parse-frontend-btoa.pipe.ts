import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseFrontendBtoaPipe implements PipeTransform {
  /**
   * Transforms input data from the frontend as a Base64
   * string into a decoded object.
   *
   * @param value The Base64 string to decode
   */
  public transform(value: string | null, metadata: ArgumentMetadata): any {
    if(typeof value === 'string') {
      return JSON.parse(Buffer.from(value, 'base64').toString());
    } else {
      return undefined;
    }
  }
}
