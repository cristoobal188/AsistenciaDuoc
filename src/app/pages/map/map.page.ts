import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Location } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map!: L.Map;
  duocLocation: [number, number] = [-33.611503, -70.575932];
  currentLocationMarker!: L.Marker;

  constructor(private location: Location) {}

  ngOnInit() {
    setTimeout(() => {
      this.loadMap();
    }, 100); 
  }

  loadMap() {
    this.map = L.map('mapId').setView(this.duocLocation, 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © OpenStreetMap contributors'
    }).addTo(this.map);

    this.setDuocMarker();
  }

  setDuocMarker() {
    if (this.currentLocationMarker) {
      this.map.removeLayer(this.currentLocationMarker);
    }
    
    this.currentLocationMarker = L.marker(this.duocLocation).addTo(this.map)
      .bindPopup('DuocUC Sede Puente Alto').openPopup();
  }

  goBack() {
    this.location.back();
  }
}
