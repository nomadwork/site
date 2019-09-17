import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) { }

  @Output() showModal = new EventEmitter();
  @Input() show = false;
  hours = [];
  minutes = [];

  suggestionForm: FormGroup;

  ngOnInit() {
    this.suggestionForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      email: [null, [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(100)]],
      number: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      wifi: ['0'],
      noise: ['0'],
      powerPlug: ['0'],
      openHour: [null, Validators.required],
      openMinute: [null, Validators.required],
      closeHour: [null, Validators.required],
      closeMinute: [null, Validators.required],
    })
    this.getHours();
    this.getMinutes();
  }

  suggestionSubmit() {
    const value = this.suggestionForm.value;
    console.log(value);
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

  closeModal() {
    this.show = !this.show;
    this.showModal.emit(false);
  }

}
