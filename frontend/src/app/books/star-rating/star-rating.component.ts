// Module inspired by prior work of: https://github.com/MurhafSousli/ngx-bar-rating

import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, Validator, NG_VALIDATORS, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarRatingComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => StarRatingComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarRatingComponent implements OnInit, OnChanges, ControlValueAccessor, Validator {

  @Input() public rating = 0;
  @Input() public max = 5;
  @Input() public readOnly = false;
  @Input() public showText = false;
  @Input() public titles: string[] = [];
  @Input() public required = false;

  public nextRating: number = 1;
  public disabled: boolean = false;

  public contexts: {
    fraction: boolean,
    selected: boolean,
    active: boolean,
    click: (e: Event) => void,
    enter: () => void
  }[] = [];

  public onChange = (_: any) => {};
  public onTouched = () => {};

  constructor(
    private readonly $changeDetectorRef: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.contexts = Array.from({ length: this.max }, (ctx, idx) => {
      return {
        selected: false,
        fraction: false,
        active: false,
        click: (e) => this.handleClick(e, idx + 1),
        enter: () => this.handleEnter(idx + 1)
      }
    })

    this.updateState(this.rating);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if(changes.rating) {
      this.update(this.rating)
    }
  }

  public validate(cntrl: FormControl): { require: boolean } | null {
    return (this.required && !cntrl.value) ? { require: true }: null;
  }

  public writeValue(val: number): void {
    this.update(val, false);
    this.$changeDetectorRef.markForCheck();
  }

  public registerOnChange(fn: (val: any) => any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => any): void {
    this.onTouched = fn;
  }

  public setDisabledState(val: boolean): void {
    this.readOnly = val;
  }

  public reset(): void {
    this.updateState(this.rating);
  }

  public update(newRating: number, internalChange = true): void {
    if(!this.readOnly && this.rating !== newRating) {
      this.rating = newRating;
    }
    if(internalChange) {
      this.onChange(this.rating);
      this.onTouched();
    }
    this.updateState(this.rating);
  }

  private handleClick(ev: Event, val: number): void {
    ev.preventDefault();
    ev.stopPropagation();
    this.update(val + 1);
  }

  private handleEnter(idx: number): void {
    if(!this.readOnly) {
      this.contexts.map((ctx, i) => {
        ctx.active = i <= idx;
        ctx.fraction = false;
        ctx.selected = false;
      });
      this.nextRating = idx;
    }
  }

  private updateState(nextVal: number): void {
    this.nextRating = nextVal - 1;
    this.contexts = Array.from({ length: this.max }, (ctx, idx) => {
      return {
        selected: idx < nextVal,
        fraction: (idx + 1 === Math.round(nextVal) && nextVal % 1) >= 0.5,
        active: false,
        click: ((e: Event) => this.handleClick(e, idx)),
        enter: () => this.handleEnter(idx)
      }
    });
  }
}
