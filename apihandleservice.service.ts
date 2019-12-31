import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApihandleserviceService {

  myurl:String;
  data:any[];

  constructor(private http:HttpClient) {
    this.myurl="http://prateekparhinode.us-east-2.elasticbeanstalk.com";
  }

  public getAutocompletedata(cityname){
    return this.http.get(this.myurl+"/autocomplete?cityname="+cityname);
  }

  public getLatLong(street,city,state){
    return this.http.get(this.myurl+"/weathercoord?street="+street+"&"+"city="+city+"&"+"state="+state);
  }

  public getWeatherData(lat,lon){
    return this.http.get(this.myurl+"/weatherplace?lat="+lat+"&"+"lon="+lon);
  }

  public getDailyData(lat,lon,time){
    return this.http.get(this.myurl+"/weatherdaily?lat="+lat+"&"+"lon="+lon+"&"+"time="+time);
  }

  public getIPAPI(){
    return this.http.get("http://ip-api.com/json");
  }

  public getStateSeal(statename){
    return this.http.get(this.myurl+"/customsearch?statename="+statename);
  }
}
