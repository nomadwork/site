import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegisterPlaceComponent } from './register-place/register-place.component';
import { MapService } from '../../services/map.service';
import { DialogPlaceDetailComponent } from 'src/app/shared/dialog-place-detail/dialog-place-detail.component';

@Component({
  selector: 'app-home-map',
  templateUrl: './home-map.component.html',
  styleUrls: ['./home-map.component.scss']
})
export class HomeMapComponent implements OnInit {

  constructor(private dialog: MatDialog, private mapService: MapService) { }

  registerPlace = {};
  iconUrl = 'src/../../../assets/img/my-pin.svg';
  map;
  geoLocation;
  markers;
  showModal = false;
  config: any = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  userIcon = L.icon({
    popupAnchor: [0, -35],
    iconAnchor: [20, 36],
    iconUrl: 'src/../../../assets/img/my-pin.svg'
  });
  nwsIcon = L.icon({
    popupAnchor: [0, -35],
    iconAnchor: [20, 36],
    className: 'blink',
    iconUrl: 'src/../../../assets/img/nws-pin.svg'
  });

  // CONFIGURAÇÃO DOS POPUPS
  customNwsPopup = {
    className: 'nws',
    maxWidth: 500,
    closeButton: false
  };

  customUserPopup = {
    className: 'nws',
    maxWidth: 500,
    closeButton: false
  };

  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
        {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
        })
    ],
    // zoom: 15,
    center: []
  };


  ngOnInit() {  }

  show() {

    const data = this.geoLocation;

    const modal = this.dialog.open(RegisterPlaceComponent, {
      width: '98%',
      maxWidth: 550,
      maxHeight: '95vh',
      data
    });

    modal.afterClosed()
      .subscribe(r => {
        this.registerPlace = r;
      });

  }

  onMapReady(map: L.Map) {

    this.map = map;

    // CONFIGURAÇÃO DOS MARCADORES

    if (navigator) {
      navigator.geolocation.getCurrentPosition(async pos => {

        await map.on('dragend', async e => {
          const { lat, lng } = map.getCenter();
          await this.getMarkers({ latitude: lat, longitude: lng });
        });

        this.geoLocation = pos;
        const { latitude, longitude } = pos.coords;
        this.getMarkers({ latitude, longitude });

        map.setView([latitude, longitude], 15);

        const currentPosition = await L.marker([latitude, longitude], { icon: this.userIcon }).addTo(map).on('click', this.mapFly);
        currentPosition.bindPopup(`<b>Você está aqui</b>`, this.customUserPopup).openPopup();

      }, err => console.error(err), this.config);
    }
  }

  mapFly(event: any) {
    this.map.flyTo(event.latlng, 17, {
      animate: true,
      duration: .5
    });
  }

  getMarkers(latlng) {
    this.mapService.markers(latlng).subscribe(data => {

      const marker = Array.from(new Set(data.result.map(a => a.id)))
        .map(id => {
          return data.result.find(a => a.id === id);
        });


      // TODO Jerson deu a ideia de fazer várias funções que não sei eu acho que deveria usar Set ai de baixo
      marker.forEach(x => {
        const nws = L.marker([x.geolocation.latitude, x.geolocation.longitude],
          { icon: this.nwsIcon }).addTo(this.map).on('click', (e: any) => {
            console.log(e);
            this.map.flyTo(e.latlng);
          });
        nws.bindPopup(`<b '(click)="showThisPlace({{x.id}})' ">${x.name}</b>`, this.customNwsPopup);
      });

    });
  }

  center() {
    const { latitude, longitude } = this.geoLocation.coords;
    this.getMarkers({ latitude, longitude });
    this.map.flyTo([latitude, longitude], 15, {
      animate: true,
      duration: .5
    });
  }

  showThisPlace(id: number) {
    this.mapService.detailAboutThisPlace(id)
      .subscribe(resultDetail => {
        this.dialog.open(DialogPlaceDetailComponent, {
          width: '90%',
          data: resultDetail
        });
      }, error => console.log(error));
  }

}
