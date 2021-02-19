import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';

@Injectable()
export class EncryptionService {
  private key: Buffer;

  /**
   * Encryption Service constructor
   */
  constructor() {
    this.key = scryptSync(process.env.SECRET_KEY as string, 'salt', 32) as Buffer;
  }

  /**
   * Encrypt a string
   *
   * @param text The string to encrypt.
   */
  public async encrypt(text: string): Promise<string> {
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-ctr', this.key, iv);

    const buf = Buffer.concat([
      cipher.update(text),
      cipher.final()
    ]);

    return `${iv.toString('hex')}:${buf.toString('hex')}`;
  }

  /**
   * Decrypt a string
   *
   * @param text The string to decrypt
   */
  public async decrypt(text: string): Promise<String> {
    const [iv, encryptedText] = text.split(':').map(part => Buffer.from(part, 'hex'));
    const decipher = createDecipheriv('aes-256-ctr', this.key, iv);

    const buf = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final()
    ]);

    return buf.toString();
  }
}
