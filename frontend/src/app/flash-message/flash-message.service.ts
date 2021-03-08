import { Injectable } from '@angular/core';
import { List } from 'immutable';
import { Observable, BehaviorSubject } from 'rxjs';
import { Message } from './message';

@Injectable()
export class FlashMessageService {

  private messagesSubject: BehaviorSubject<List<Message>>;

  constructor() {
    this.messagesSubject = new BehaviorSubject(List<Message>());
  }

  public add(msg: Message) {
    this.messagesSubject.next(this.messagesSubject.value.push(msg))
  }

  public remove(idx: number) {
    this.messagesSubject.next(this.messagesSubject.value.remove(idx));
  }

  public get messages(): Observable<List<Message>> {
    return this.messagesSubject.asObservable()
  }
}
