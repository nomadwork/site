import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EstablishmentService } from 'src/app/services/establishment.service';

@Component({
  selector: 'app-dialog-establishments',
  templateUrl: './dialog-establishments.component.html',
  styleUrls: ['./dialog-establishments.component.scss']
})
export class DialogEstablishmentsComponent implements OnInit {

  establishments = [];
  stepOne = true;
  stepTwo = false;
  showName = '';

  single: any[];
  singleTwo: any[];
  view: any[] = [1000, 400];

  // options graphs
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Gênero';
  xAxisLabelTwo = 'Anos';
  showYAxisLabel = true;
  yAxisLabel = 'Quantidade';
  yAxisLabelTwo = 'Quantidade';

  colorScheme = {
    domain: ['#ff66cc', '#0099ff', '#ffff00']
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private establishmentService: EstablishmentService
    , public dialogRef: MatDialogRef<DialogEstablishmentsComponent>) {
  }

  ngOnInit() {
    this.establishments = this.data;

  }

  details(id, name) {
    this.showName = name;
    this.establishmentService.getDetailsEstablishment(id)
      .subscribe(resultApi => {
        console.log(resultApi);
        const single = resultApi.result.gender;
        const singleTwo = resultApi.result.age;

        Object.assign(this, { single });
        Object.assign(this, { singleTwo });

      }, error => console.log(error));
    this.changeStep();
  }

  changeStep() {
    this.stepOne = !this.stepOne;
    this.stepTwo = !this.stepTwo;
  }
}
