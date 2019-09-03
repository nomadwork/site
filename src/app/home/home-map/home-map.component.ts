import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-home-map',
  templateUrl: './home-map.component.html',
  styleUrls: ['./home-map.component.scss']
})
export class HomeMapComponent implements OnInit {

  iconUrl: string = 'src/../../../assets/img/my-pin.svg'

  option: any = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  options = {
    layers: [
      L.tileLayer('https://api.maptiler.com/maps/voyager/{z}/{x}/{y}.png?key=0F5UrAwo6SzYzOVTaUfW', { maxZoom:18, attribution: 'Nomad Work' })
    ],
    zoom: 15,
    center: L.latLng(-8.0631, -34.8713)
  };

  onMapReady(map: L.Map) {
    var myIcon = L.icon({
      iconAnchor: [40, 24],
      iconUrl: 'src/../../../assets/img/my-pin.svg'
    })
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        const { latitude, longitude } = pos.coords;

        map.panTo([latitude, longitude])
        L.marker([latitude, longitude], { icon: myIcon }).addTo(map);

      }, err => console.error(err), this.option);
    }
  }

  constructor() {
  }


  ngOnInit() {


  }

}
