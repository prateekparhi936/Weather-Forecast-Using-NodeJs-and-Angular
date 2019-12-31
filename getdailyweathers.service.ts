import { Injectable } from '@angular/core';
import {ApihandleserviceService} from './apihandleservice.service';
@Injectable({
  providedIn: 'root'
})
export class GetdailyweathersService {

  dailydata={};
  constructor(private apihandleservice:ApihandleserviceService) { }
  getdailyweatherdata(lat,long,time){
    this.apihandleservice.getDailyData(encodeURIComponent(lat),encodeURIComponent(long),encodeURIComponent(time)).subscribe((data:{})=>{
      this.dailydata=data;
  });
  return this.dailydata;
}
}
