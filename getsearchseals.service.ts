import { Injectable } from '@angular/core';
import {ApihandleserviceService} from './apihandleservice.service';

@Injectable({
  providedIn: 'root'
})
export class GetsearchsealsService {
  sealdata={};
  constructor(private apihandleservice:ApihandleserviceService) { }
  public getstatesealdata(statename){
  this.apihandleservice.getStateSeal(encodeURIComponent(statename)).subscribe((data:{})=>{
    this.sealdata=data;
  });
  return this.sealdata
  }
}
