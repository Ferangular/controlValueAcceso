import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {StarRatingComponent} from "./star-rating/star-rating.component";
import {RatingNameComponent} from "./rating-name/rating-name.component";
import {MatIcon} from "@angular/material/icon";
import {JsonPipe} from "@angular/common";

@Component({
	selector: 'app-root',
	standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, StarRatingComponent, RatingNameComponent, MatIcon, JsonPipe],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	title = 'controlValueAcceso';
  formGroup = new FormGroup({
    title: new FormControl('El Quijote', Validators.required),
    rating: new FormControl(1, Validators.min(3)),
    ratingName: new FormControl({ name: 'Pepe', rating: 5 })
  });

  clickSave(): void {
    console.log('valid--> ', this.formGroup.valid);
    console.log('valid--> ', this.formGroup.controls.ratingName.errors);
  }
}
