import {Component, forwardRef, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting:forwardRef(() => StarRatingComponent),
      multi: true
    }
  ],
})
export class StarRatingComponent implements OnInit, ControlValueAccessor {
  private _rating: number = 3;
  ratingArr: number[] = [];

  private _onChanged: Function = (_value: number) => {};
  private _onTouch: Function = (_value: number) => {};


  ngOnInit(): void {
    for (let index = 0; index < 5; index++) {
      this.ratingArr.push(index);
    }
  }

  onClick(param: any) {
    this._rating= param;
    this._onChanged(this._rating);
    this._onTouch(this._rating);
  }


  showIcon(index: number): string {
    return this._rating >= index + 1 ? 'star' : 'star_border';
  }

  writeValue(value: number): void {
    if(value){
      this._rating = value;
    }
  }

  registerOnChange(fn: any): void {
    this._onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }



}
