import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-dialog-place-detail',
  templateUrl: './dialog-place-detail.component.html',
  styleUrls: ['./dialog-place-detail.component.scss']
})
export class DialogPlaceDetailComponent implements OnInit {

  modalData;
  public config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    scrollbar: false,
    navigation: false,
    pagination: true
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {
    this.modalData = this.data.result;
    console.log(this.data.result);
  }


  getQualityConnect(quality: number) {
    switch (quality) {
      case 0:
        return 'Sem conexão';
      case 1:
        return 'Fraca';
      case 2:
        return 'Média';
      case 3:
        return 'Excelente';
    }
  }

  getQualityNoise(quality: number) {
    switch (quality) {
      case 0:
        return 'Alto';
      case 1:
        return 'Médio';
      case 2:
        return 'Baixo';
      case 3:
        return 'Sem ruído';
    }

  }

}
