import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation?: [ number, number ];

  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  constructor( private http: HttpClient ) {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[ number, number ]> {

    return new Promise( ( resolve, reject ) => {

      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.useLocation = [ coords.longitude, coords.latitude ];
          resolve( this.useLocation );
        },
        ( err ) => {
          alert( 'No se pudo obtener la geolocalización' )
          console.log(err);
          reject();
        }
      );

    });

  }


  getPlacesByQuery( query: string = '' ){
    // todo: evaluar cuando el query es nulo

    this.isLoadingPlaces = true;


    this.http.get<PlacesResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${ query }.json?limit=5&proximity=-73.98853656442466%2C40.728636535880696&language=es&access_token=pk.eyJ1IjoibWlndWVsYmV0YTEiLCJhIjoiY2x0N2MxdHg4MGs3bzJrcHRoaWloaXBlbyJ9.X3yyu94-685Mo97LQoELvw`)
      .subscribe( resp => {

        console.log( resp.features )

        this.isLoadingPlaces = false;
        this.places = resp.features
      });
  }

}
