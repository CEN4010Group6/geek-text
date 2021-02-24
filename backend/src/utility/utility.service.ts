import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilityService {
  /**
   * Converts an input Base64 encoded string representing a JSON object into a JSON object
   *
   * @param input Input Base64 encoded JSON object
   */
  public async convertBtoO(input: string): Promise<any> {
    return JSON.parse(Buffer.from(input, 'base64').toString());
  }
}
