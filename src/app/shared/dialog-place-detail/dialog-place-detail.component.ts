import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-place-detail',
  templateUrl: './dialog-place-detail.component.html',
  styleUrls: ['./dialog-place-detail.component.scss']
})
export class DialogPlaceDetailComponent implements OnInit {

  images = ['https://upload.wikimedia.org/wikipedia/commons/5/54/Fachada_5%C2%AA_Etapa.jpg',
    'http://4.bp.blogspot.com/_gO-yLO7RllY/TPnEgoy5jPI/AAAAAAAAAEk/8TUfpLygrTg/s1600/shopping+recife.jpg']

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  modalData;

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
