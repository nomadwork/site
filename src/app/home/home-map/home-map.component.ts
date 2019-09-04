import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { LoginService } from '../../services/login.service'

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
      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', { maxZoom:19,  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>' })
    ],
    zoom: 15,
    center: L.latLng(-8.0631, -34.8713)
  };

  onMapReady(map: L.Map) {
    const myIcon = L.icon({
      popupAnchor:[7,-35],
      iconAnchor: [25, 50],
      iconUrl: 'src/../../../assets/img/my-pin.png'
    });

    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        const { latitude, longitude } = pos.coords;

        map.panTo([latitude, longitude])

        this.loginService.markers().subscribe((data)=>{
          data.marker.forEach(marker =>{

         const nws =  L.marker([marker.latitude, marker.longitude]).addTo(map);
         nws.bindPopup(marker.name);
          })
        })
        const currentPosition = L.marker([latitude, longitude],{ icon: myIcon }).addTo(map);
        currentPosition.bindPopup("Você está aqui").openPopup();

      }, err => console.error(err), this.option);
    }
  }

  constructor(private loginService: LoginService) { }


  ngOnInit() { 
  }

}
