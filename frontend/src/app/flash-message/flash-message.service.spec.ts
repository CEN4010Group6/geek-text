import { TestBed } from '@angular/core/testing';

import { FlashMessageService } from './flash-message.service';
import { Level } from './level';

describe('FlashMessageService', () => {
  let service: FlashMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FlashMessageService
      ]
    });
    service = TestBed.inject(FlashMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should allow for a message to be added and removed', () => {
    service.add({ value: 'Hello', level: Level.Info });
    service.messages.subscribe((msgs) => {
      expect(msgs.size).toBe(1);
    });

    service.remove(0);

    service.messages.subscribe((msgs) => {
      expect(msgs.size).toBe(0);
    });
  });
});
