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
  noise = 'checked';
  fields = [
    {
      classification: 0,
      type: 2,
      service: 0
    },
    {
      classification: 0,
      type: 1,
      service: 1
    },
    {
      classification: 0,
      type: 3,
      service: 2
    }
  ];
  names = [{
    name: 'WiFi',
    iconOn: 'wifi',
    iconOff: 'wifi_off'
  }, {
    name: 'Tomada',
    iconOn: 'power',
    iconOff: 'power_off'
  }, {
    name: 'Ruído',
    iconOn: 'voice_over_off',
    iconOff: 'record_voice_over'
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

    console.log(JSON.stringify(value));
    console.log(JSON.parse(value));
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
      control.push(this.patchValues(x.classification, x.type, x.service))
    })
  }

  patchValues(classification, type, service) {
    return this.formBuilder.group({
      classification: [classification],
      type: [type],
      service: [service]
    })
  }

}
