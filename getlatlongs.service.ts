import { Injectable } from '@angular/core';
import {ApihandleserviceService} from './apihandleservice.service';

@Injectable({
  providedIn: 'root'
})
export class GetlatlongsService {
  public lat:any;
  public long:any;

  constructor(private apihandleservice:ApihandleserviceService) {
   }
   public getGeocodeData(streetname,cityname,statename){
    this.apihandleservice.getLatLong(encodeURIComponent(streetname),encodeURIComponent(cityname),encodeURIComponent(statename)).subscribe((data:{})=>{
        let weather_latlong_data = data['results'][0]['geometry']['location'];
        this.lat=weather_latlong_data['lat'];
        this.long=weather_latlong_data['lng'];
   });
   return {lat:this.lat,long:this.long};
  }
}
