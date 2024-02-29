import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { error } from 'console';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

Mapboxgl.accessToken = 'pk.eyJ1IjoibWlndWVsYmV0YTEiLCJhIjoiY2x0N2MxdHg4MGs3bzJrcHRoaWloaXBlbyJ9.X3yyu94-685Mo97LQoELvw';


if( !navigator.geolocation ){
  alert('Navegador no soporta Geolacalización');
  throw new Error('Navegado no soporta la geolocaclización');
}


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
