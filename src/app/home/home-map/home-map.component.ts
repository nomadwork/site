import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { LoginService } from '../../services/login.service'

@Component({
  selector: 'app-home-map',
  templateUrl: './home-map.component.html',
  styleUrls: ['./home-map.component.scss']
})
export class HomeMapComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  iconUrl: string = 'src/../../../assets/img/my-pin.svg';
  map;
  geoLocation;

  config: any = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>' })
    ],
    // zoom: 15,
    center: []
  };

  ngOnInit() { }

  onMapReady(map: L.Map) {

    this.map = map;

    // CONFIGURAÇÃO DOS MARCADORES
    const userIcon = L.icon({
      popupAnchor: [0.5, -30],
      iconAnchor: [32, 46],
      iconUrl: 'src/../../../assets/img/my-pin.png'
    });
    const nwsIcon = L.icon({
      popupAnchor: [-3, -35],
      iconAnchor: [36, 45],
      className: 'blink',
      iconUrl: 'src/../../../assets/img/nws-pin.png'
    });

    // CONFIGURAÇÃO DOS POPUPS
    const customNwsPopup = {
      className: 'nws',
      maxWidth: 500,
      closeButton: false
    }
    const customUserPopup = {
      className: 'nws',
      maxWidth: 500,
      closeButton: false
    }

    if (navigator) {
      navigator.geolocation.getCurrentPosition(async pos => {

        this.geoLocation = pos;
        const { latitude, longitude, accuracy } = pos.coords;

        map.setView([latitude, longitude], 15)

        const currentPosition = await L.marker([latitude, longitude], { icon: userIcon }).addTo(map).on('click', mapFly);
        currentPosition.bindPopup(`<b>Você está em um raio de ${accuracy}m</b>`, customUserPopup).openPopup();

        L.circle([latitude, longitude], accuracy).addTo(map);

        await this.loginService.markers().subscribe((data) => {

          data.marker.forEach(marker => {
            const nws = L.marker([marker.latitude, marker.longitude], { icon: nwsIcon }).addTo(map).on('click', mapFly)
            nws.bindPopup(`<b>${marker.name}</b>`, customNwsPopup);
          })

        });

        function mapFly(event: any) {
          map.flyTo(event.latlng, 17, {
            animate: true,
            duration: .5
          });
        };

      }, err => console.error(err), this.config);
    };
  }

  center() {
    const { latitude, longitude } = this.geoLocation.coords;
    this.map.flyTo([latitude, longitude], 15, {
      animate: true,
      duration: .5
    });
  }



}