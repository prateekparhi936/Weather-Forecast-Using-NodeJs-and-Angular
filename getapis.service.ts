import { Injectable } from '@angular/core';
import {ApihandleserviceService} from './apihandleservice.service';

@Injectable({
  providedIn: 'root'
})
export class GetapisService {

  public lat:any;
  public long:any;
  public statename:any;
  public cityname:any;
  constructor(private apihandleservice:ApihandleserviceService) { }

  getIPData(){
    this.apihandleservice.getIPAPI().subscribe((data:{})=>{
      this.lat=data['lat'];
      this.long=data['lon'];
      this.statename=data['regionName'];
      this.cityname=data['city'];
  });
   return {lat:this.lat,long:this.long,cityname:this.cityname,statename:this.statename};
}

}
