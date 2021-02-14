import { Injectable } from '@nestjs/common';
import { Map } from 'immutable';
import { Observable, of } from 'rxjs';
import { runInThisContext } from 'vm';

@Injectable()
export class CacheService {
  private cache: Map<string, any>;

  /**
   * CacheService constructor.
   */
  constructor() {
    // Using an in-memory, immutable hash Map to store data.
    this.cache = Map();
  }

  /**
   * Get a value from the cache.
   * @param key The key to search for in the cache.
   */
  public async get(key: string): Promise<any> {
    return this.cache.get(key)
  }

  public async set(key: string, value: any): Promise<void> {
    this.cache = this.cache.set(key, value);
  }

  public async contains(key: string): Promise<boolean> {
    return this.cache.contains(key);
  }

  public async delete(key: string): Promise<any> {
    this.cache = this.cache.delete(key);
  }

  public async size(key: string): Promise<number> {
    return this.cache.count();
  }
}
