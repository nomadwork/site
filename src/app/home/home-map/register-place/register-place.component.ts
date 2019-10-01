import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Establishmment from 'src/app/models/establishmment';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register-place',
  templateUrl: './register-place.component.html',
  styleUrls: ['./register-place.component.scss']
})
export class RegisterPlaceComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RegisterPlaceComponent>) {
  }

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
      wifi: [null, Validators.required],
      noise: [null, Validators.required],
      plug: [null, Validators.required],
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
    const establishmment = this.createObjectSubmit(this.suggestionForm);
    console.log(establishmment);
  }

  createObjectSubmit(formValues) {
    const objSend = new Establishmment();
    objSend.email = formValues.value.email;
    objSend.latitude = formValues.value.latitude;
    objSend.longitude = formValues.value.longitude;
    objSend.name = formValues.value.name;
    objSend.noise.rate = formValues.value.noise;
    objSend.wifi.rate = formValues.value.wifi;
    objSend.plug.rate = formValues.value.plug;
    objSend.schedule.open = formValues.value.schedule.open + ':' + formValues.value.schedule.openMinute;
    objSend.schedule.close = formValues.value.schedule.close + ':' + formValues.value.schedule.closeMinute;

    return objSend;
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
