import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilityService {
  /**
   * Converts an input Base64 encoded string representing a JSON object into a JSON object
   *
   * @param input Input Base64 encoded JSON object
   */
  public async convertBtoO<T>(input: string): Promise<T> {
    return JSON.parse(Buffer.from(input, 'base64').toString());
  }

  /**
   * Converts an input Objecct to a Base64 encoded string.
   *
   * @param input Input Object
   */
  public async convertOtoB<T>(input: T): Promise<string> {
    return Buffer.from(JSON.stringify(input)).toString('base64');
  }
}
