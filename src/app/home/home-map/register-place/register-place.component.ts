import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
  fields = [
    {
      quality: 0,
      quantity: 0,
      service: 0
    },
    {
      quality: 0,
      quantity: 0,
      service: 1
    },
    {
      quality: 0,
      quantity: 0,
      service: 2
    }
  ];
  names = [{
    name: 'WiFi',
    icon: 'wifi'
  }, {
    name: 'Tomara',
    icon: 'power'
  }, {
    name: 'Ruído',
    icon: 'question_answer'
  }]

  suggestionForm: FormGroup;

  ngOnInit() {

    this.suggestionForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      email: [null, [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(100)]],
      number: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      wifi: ['0'],
      noise: ['0'],
      energy: ['0'],
      schedule: this.formBuilder.group({
        open: [null, Validators.required],
        openMinute: [null, Validators.required],
        close: [null, Validators.required],
        closeMinute: [null, Validators.required]
      }),
      geoLocation: this.formBuilder.group({
        latitude: [this.data.coords.latitude],
        longitude: [this.data.coords.longitude]
      }),
      services: this.formBuilder.array([])
    })
    this.getHours();
    this.getMinutes();
    this.patch();

  }

  suggestionSubmit() {
    const value = this.suggestionForm.value;
    value.schedule.open = value.schedule.open + ':' + value.schedule.openMinute
    value.schedule.close = value.schedule.close + ':' + value.schedule.closeMinute
    delete value.schedule.openMinute;
    delete value.schedule.closeMinute;

    console.log(value);
  }

  close() {
    this.dialogRef.close('Eae pedro');
  }

  getHours() {
    for (var i = 0; i < 24; i++) {
      this.hours.push(i);
    }
  }

  getMinutes() {
    for (var i = 0; i < 60; i++) {
      this.minutes.push((i < 10 ? '0' : '') + i);
    }
  }

  patch() {
    const control = <FormArray>this.suggestionForm.get('services');
    this.fields.forEach(x => {
      control.push(this.patchValues(x.quality, x.quantity, x.service))
    })
  }

  patchValues(quality, quantity, service) {
    return this.formBuilder.group({
      quality: [quality],
      quantity: [quantity],
      service: [service]
    })
  }

}
