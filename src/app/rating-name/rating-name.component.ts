import {Component, forwardRef} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor, FormBuilder, NG_VALIDATORS, NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators
} from "@angular/forms";
import {StarRatingComponent} from "../star-rating/star-rating.component";
import {debounce, debounceTime} from "rxjs";

@Component({
  selector: 'app-rating-name',
  standalone: true,
  imports: [
    StarRatingComponent,
    ReactiveFormsModule
  ],
  templateUrl: './rating-name.component.html',
  styleUrl: './rating-name.component.scss',
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=>RatingNameComponent),
      multi: true
    },
    {
      provide:NG_VALIDATORS,
      useExisting: forwardRef(()=>RatingNameComponent),
      multi: true
    }
  ]
})
export class RatingNameComponent  implements ControlValueAccessor, Validator {
  protected readonly _formBuilder = new FormBuilder();

  formGroup = this._formBuilder.group({
    name: ['', Validators.required],
    rating: [3, Validators.min(4)]
  });

  constructor() {
    this.formGroup.valueChanges.pipe(debounceTime(100)).subscribe(() => {
      this._onChanged(this.formGroup.value);
      this._onTouch(this.formGroup.value);
    })
  }

  private _onChanged: Function = (_value: { name: string; rating: number }) => {};
  private _onTouch: Function = (_value: { name: string; rating: number }) => {};


  registerOnChange(fn: Function): void {
    this._onChanged = fn;
  }
  registerOnTouched(fn: Function): void {
    this._onTouch = fn;
  }

  registerOnValidatorChange(fn: () => void): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  validate(_control: AbstractControl): ValidationErrors | null {
    return this.formGroup.valid ? null : { invalidRatingName: true };
  }

  writeValue(obj: { name: string; rating: number }): void {
    if(obj){
      this.formGroup.setValue(obj);
    }
  }

}
