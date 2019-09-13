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
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {
    this.modalData = this.data;
  }


  getQualityConnect(quality: string) {
    switch (quality) {
      case 'none':
        return 'Sem conexão';
      case 'low':
        return 'Fraca';
      case 'medium':
        return 'Média';
      case 'high':
        return 'Excelente';
    }
  }

  getQualityNoise(quality: string) {
    switch (quality) {
      case 'none':
        return 'Silencioso';
      case 'low':
        return 'Baixo';
      case 'medium':
        return 'Médio';
      case 'high':
        return 'Alto';
    }

  }

  hasPlugOn(flag: boolean) {
    if (flag) {
      return 'Sim';
    } else {
      return 'Não';
    }
  }


}
