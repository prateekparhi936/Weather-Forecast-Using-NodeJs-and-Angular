import { Injectable } from '@angular/core';
import {ApihandleserviceService} from './apihandleservice.service';

@Injectable({
  providedIn: 'root'
})
export class GetweathersService {
  time:any;
  currentlydata:any;
  constructor(private apihandleservice:ApihandleserviceService) { }

  getweatherdata(lat,long){
      this.apihandleservice.getWeatherData(encodeURIComponent(lat),encodeURIComponent(long)).subscribe((data:{})=>{
        this.currentlydata = data;
    });
    return this.currentlydata
  }
}
