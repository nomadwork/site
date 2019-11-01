import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Establishment from 'src/app/models/establishment';
import { EstablishmentService } from 'src/app/services/establishment.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-register-place',
  templateUrl: './register-place.component.html',
  styleUrls: ['./register-place.component.scss']
})
export class RegisterPlaceComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RegisterPlaceComponent>,
    private establishmentService: EstablishmentService,
    private alertService: AlertService) { }

  config;
  hours = [];
  minutes = [];
  noise = 'checked';
  suggestionForm: FormGroup;

  ngOnInit() {

    this.suggestionForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      email: [null, [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(100)]],
      phone: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      wifi: this.formBuilder.group({
        rate: [0, Validators.required],
      }),
      noise: this.formBuilder.group({
        rate: [0, Validators.required],
      }),
      plug: this.formBuilder.group({
        rate: [0, Validators.required],
      }),
      schedule: this.formBuilder.group({
        open: ['00', Validators.required],
        openMinute: ['00', Validators.required],
        close: ['00', Validators.required],
        closeMinute: ['00', Validators.required]
      }),
      latitude: [this.data.coords.latitude],
      longitude: [this.data.coords.longitude]
    });

    this.getHours();
    this.getMinutes();

  }

  suggestionSubmit() {
    const establishmment = this.preparerEstablishment();
    this.establishmentService.createEstablishment(establishmment)
      .subscribe(result => {
        this.dialogRef.close();
        this.alertService.success(result.message);
      }, (error) => {
        this.alertService.danger('Falha ao sugerir este local');
        console.log(error);
      });
  }

  preparerEstablishment(): Establishment {
    let establishmment;
    establishmment = this.suggestionForm.value;
    establishmment.schedule.open = establishmment.schedule.open + ':' + establishmment.schedule.openMinute;

    delete establishmment.schedule.openMinute;
    establishmment.schedule.close = establishmment.schedule.close + ':' + establishmment.schedule.closeMinute;
    delete establishmment.schedule.closeMinute;

    return establishmment;

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
