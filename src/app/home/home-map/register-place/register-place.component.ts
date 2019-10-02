import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Establishment from 'src/app/models/establishment';

@Component({
  selector: 'app-register-place',
  templateUrl: './register-place.component.html',
  styleUrls: ['./register-place.component.scss']
})
export class RegisterPlaceComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RegisterPlaceComponent>) { }

  config;
  hours = [];
  minutes = [];
  noise = 'checked';
  suggestionForm: FormGroup;

  ngOnInit() {

    this.suggestionForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      email: [null, [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(100)]],
      number: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      wifi: this.formBuilder.group({
        rate: [null, Validators.required],
      }),
      noise: this.formBuilder.group({
        rate: [null, Validators.required],
      }),
      plug: this.formBuilder.group({
        rate: [null, Validators.required],
      }),
      schedule: this.formBuilder.group({
        open: [null, Validators.required],
        openMinute: [null, Validators.required],
        close: [null, Validators.required],
        closeMinute: [null, Validators.required]
      }),
      latitude: [this.data.coords.latitude],
      longitude: [this.data.coords.longitude]
    });

    this.getHours();
    this.getMinutes();

  }

  suggestionSubmit() {
    let establishmment = new Establishment();
    establishmment = this.suggestionForm.value as Establishment;
    console.log(establishmment);
  }


  getHours() {
    for (let i = 0; i < 24; i++) {
      this.hours.push(i);
    }
  }

  getMinutes() {
    for (let i = 0; i < 60; i++) {
      this.minutes.push((i < 10 ? '0' : '') + i);
    }
  }

}
