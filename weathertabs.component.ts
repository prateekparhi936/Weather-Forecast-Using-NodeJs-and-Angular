import { Component, OnInit, Input, OnChanges,ElementRef,ViewChild} from '@angular/core';
import {GetlatlongsService} from '../getlatlongs.service';
import {GetweathersService} from '../getweathers.service';
import {GetdailyweathersService} from '../getdailyweathers.service';
import {GetsearchsealsService} from '../getsearchseals.service';
import {GetapisService} from '../getapis.service';
import {ApihandleserviceService} from '../apihandleservice.service';
import {Chart} from 'chart.js';
import * as $ from "jquery";
import * as canvasjs from './canvasjs.min';
import {MatDialogModule, MatProgressBar} from "@angular/material";
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-weathertabs',
  templateUrl: './weathertabs.component.html',
  styleUrls: ['./weathertabs.component.css']
})


export class WeathertabsComponent implements OnChanges{
  @Input("jsonformdata") jsonformdata:any;
  @Input("searchclick") searchclick:boolean;
  @Input("ischecked") ischecked:boolean;
  @Input("showtabs") showtabs:boolean;
  @Input("cleardata") cleardata:boolean;
  @ViewChild('openmodalbutton',{static: false}) openmodalbutton:ElementRef<HTMLElement>;

  favouritejson:any;
  resClicked:boolean;
  instorage:boolean;
  notinstorage:boolean;
  ipjson:any;
  geocodejson:any;
  time="";
  currentweather:any;
  dailyweather:any;
  sealdata:any;
  lat:any;
  long:any;
  statename:any;
  cityname:any;
  fav:any;
  favon:boolean;
  favempty:boolean;
  showBar:boolean;
  weather_currently:any;
  weather_stateseal:any;
  weather_latlong_data:any;
  weather_daily:any;
  showmodaldiv:boolean;
  loadval:number
  showbar:boolean;

  @ViewChild('falseclick', {static: false}) falseclick: ElementRef<HTMLElement>;

  disp_currently:boolean;
  disp_hourly:boolean;
  disp_weekly:boolean;

  items:any;
  default_tweet:string;

    chosenMod="";
    t=[];
    p=[];
    h=[];
    w=[];
    o=[];
    v=[];
    hours=[];
    tchart=[]; // This will hold our chart info
    pchar=[];
    ochart=[];
    vchart=[];
    hchart=[];
    wchart=[];
    hourlydata={};
    dataset=[];
    BarChart={};


  days=[];
  tmax=[]
  tmin=[];
  weeklychart:any;

  dailydatajson:any;

  constructor(private modalService: NgbModal,private apihandleservice:ApihandleserviceService,private getapisService:GetapisService,private getlatlongservice:GetlatlongsService,private getweathers:GetweathersService,private getdailyweathers:GetdailyweathersService,private getsearchseal:GetsearchsealsService) {
      this.disp_currently=false;
      this.disp_hourly=false;
      this.disp_weekly=false;
      this.items={};
      this.chosenMod="";
      this.t=[];
      this.p=[];
      this.h=[];
      this.w=[];
      this.o=[];
      this.v=[];
      this.hours=[];
      this.favempty=false;
      this.tchart=[]; // This will hold our chart info
      this.pchar=[];
      this.ochart=[];
      this.vchart=[];
      this.hchart=[];
      this.wchart=[];
      this.hourlydata={};
      this.dataset=[];
      this.BarChart={};
      this.days=[];
      this.tmax=[];
      this.tmin=[];
      this.showmodaldiv=false;
      this.dailydatajson={};
      this.favempty=false;
      this.favon=false;
      this.instorage=false;
      this.notinstorage=true;
      this.resClicked=true;
      this.showBar=false;
      if(this.searchclick){
        this.showBar=true;
        this.showtabs=true;
      }
  }

  ngOnChanges() {
    if(this.searchclick){
      this.showtabs=true;
      this.resClicked=true;
      this.favon=false;
      this.resClicked=true;
      this.showBar=true;
      this.loadval=0;

      console.log(this.resClicked,this.favon,this.cleardata,this.searchclick);


      // this.progressBar();
      // current_progress = 0,
      // step = 0.5; // the smaller this is the slower the progress bar
      // console.log(this.resClicked,this.favon,this.cleardata,this.searchclick);
      // progressBar(){
      //   interval = setInterval(function() {
      //       current_progress += step;
      //       progress = Math.round(Math.atan(current_progress) / (Math.PI / 2) * 100 * 1000) / 1000
      //       $(".progress-bar")
      //           .css("width", progress + "%")
      //           .attr("aria-valuenow", progress)
      //           .text(progress + "%");
      //       if (progress >= 100){
      //           clearInterval(interval);
      //       }else if(progress >= 70) {
      //           step = 0.1
      //       }
      //   }, 100);
      // }
    }
    if(this.searchclick && this.ischecked){
      this.showtabs=true;
      this.resClicked=true;
      this.favon=false;
      this.resClicked=true;
      console.log(this.resClicked,this.favon,this.cleardata,this.searchclick);
    }
    if(this.cleardata){
      this.favon=false;
      this.favempty=false;
      this.showtabs=false;
      this.resClicked=true;
      this.showBar=false;
      console.log(this.resClicked,this.favon,this.cleardata,this.searchclick);
    }
    console.log("Input received form: jsondata",this.jsonformdata);
    console.log("Input received search: searchclick",this.searchclick);
    console.log("Input received checkbox: ischecked",this.ischecked);
    console.log("INput received form: showtabs",this.showtabs);
    console.log("INput received form: cleardata",this.cleardata);

    if(this.searchclick && this.ischecked){
        this.apihandleservice.getIPAPI().subscribe((data:{})=>{
        this.lat=data['lat'];
        this.long=data['lon'];
        this.statename=data['regionName'];
        this.cityname=data['city'];

        // let flag=false;
        // let items=JSON.parse(localStorage.getItem("weatherstore"))
        // for (var i =0; i< items.length; i++) {
        //   if (items[i]["city"] == this.cityname) {
        //     flag=true;
        //   }
        // }
        // if(flag){
        //     this.instorage=true;
        //     this.notinstorage=false;
        // }
        // else{
        //   this.instorage=false;
        //   this.notinstorage=true;
        // }

          this.apihandleservice.getWeatherData(encodeURIComponent(this.lat),encodeURIComponent(this.long)).subscribe((data:{})=>{
          this.weather_currently = data;
          this.time=this.weather_currently['currently']['time'];


              this.apihandleservice.getStateSeal(encodeURIComponent(this.statename)).subscribe((data:{})=>{
              this.weather_stateseal=data;


              this.createcurrentlycard();
            })
            
        })

    });

    }

    else if(!this.ischecked && this.searchclick){
      this.cityname=this.jsonformdata['CityName'];
      this.statename=this.jsonformdata['states'];
      this.apihandleservice.getLatLong(encodeURIComponent(this.jsonformdata['StreetName']),encodeURIComponent(this.jsonformdata['CityName']),encodeURIComponent(this.jsonformdata['states'])).subscribe((data:{})=>{
          
          this.weather_latlong_data = data['results'][0]['geometry']['location'];
          this.lat=this.weather_latlong_data['lat'];
          this.long=this.weather_latlong_data['lng'];
  
          this.apihandleservice.getWeatherData(encodeURIComponent(this.lat),encodeURIComponent(this.long)).subscribe((data:{})=>{
              this.weather_currently = data;
              this.time=this.weather_currently['currently']['time'];

                this.apihandleservice.getStateSeal(encodeURIComponent(this.statename)).subscribe((data:{})=>{
                  this.weather_stateseal=data;

                  // console.log(this.cityname,this.statename);
                  this.createcurrentlycard();
            })
    })
  });

    
    }
    
}
funcprint(){
  // console.log("inside print func");
  // console.log(this.weather_currently);
  // console.log(this.weather_stateseal);
  // if(this.disp_currently){
  //   this.createcurrentlycard();
  // }
}

createcurrentlycard(){
  this.showBar=false;
  // console.log("inside displayCurrently from callback")
  this.disp_currently=true;
  this.disp_weekly=false;
  this.disp_hourly=false;
  this.favon=false;

  let flag=false;
    let items=JSON.parse(localStorage.getItem("weatherstore"))
    for (var i =0; i< items.length; i++) {
      if (items[i]["city"] == this.cityname) {
        flag=true;
      }
    }
    if(flag){
        this.instorage=true;
        this.notinstorage=false;
    }
    else{
      this.instorage=false;
      this.notinstorage=true;
    }


  
    this.default_tweet="The current temperature at "+this.cityname+" is "+this.weather_currently['currently']['temperature']+" F. The weather conditions are "+this.weather_currently['currently']['summary']+" #CSCI571WeatherSearch";
    this.default_tweet=encodeURIComponent(this.default_tweet);
    console.log("tweet: ",this.default_tweet)
    this.items={};
    this.items["statename"]=this.statename;
    this.items["timezone"]=this.weather_currently['timezone'];
    this.items["temperature"]=this.weather_currently['currently']['temperature'];
    this.items["summary"]=this.weather_currently['currently']['summary'];
    this.items["stateseal"]=this.weather_stateseal['items'][0]['link'];

    if(this.weather_currently['currently']['humidity']!==undefined){
        this.items['humidity']=this.weather_currently['currently']['humidity']
        this.items['humidityicon']="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-16-512.png"
    }
    if(this.weather_currently['currently']['pressure']!==undefined){
      this.items['pressure']=this.weather_currently['currently']['pressure']    
      this.items['pressureicon']="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-25-512.png" 
    }
    if(this.weather_currently['currently']['windSpeed']!==undefined){
      this.items['windspeed']=this.weather_currently['currently']['windSpeed']    
      this.items['windspeedicon']="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-27-512.png"  
    }
    if(this.weather_currently['currently']['visibility']!==undefined){
      this.items['visibility']=this.weather_currently['currently']['visibility']   
      this.items['visibilityicon']="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-30-512.png"       
    }
    if(this.weather_currently['currently']['cloudCover']!==undefined){
      this.items['cloudcover']=this.weather_currently['currently']['cloudCover'] 
      this.items['cloudcovericon']="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-28-512.png"
    }
    if(this.weather_currently['currently']['ozone']!==undefined){
      this.items['ozone']=this.weather_currently['currently']['ozone']   
      this.items['ozoneicon']="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-24-512.png"
    }
}

buttoncreatecurrentlycard(event){
  // console.log("inside displayCurrently from button");
  this.disp_currently=true;
  this.disp_weekly=false;
  this.disp_hourly=false;
  this.favon=false;
  this.favempty=false;

  if(this.searchclick || this.ischecked){
  
    this.default_tweet="The current temperature at "+this.cityname+" is "+this.weather_currently['currently']['temperature']+" F. The weather conditions are "+this.weather_currently['currently']['summary']+" #CSCI571WeatherSearch";
    this.default_tweet=encodeURIComponent(this.default_tweet);
    console.log("tweet: ",this.default_tweet)
    this.items={};
    this.items["statename"]=this.statename;
    this.items["timezone"]=this.weather_currently['timezone'];
    this.items["temperature"]=this.weather_currently['currently']['temperature'];
    this.items["summary"]=this.weather_currently['currently']['summary'];
    this.items["stateseal"]=this.weather_stateseal['items'][0]['link'];

    if(this.weather_currently['currently']['humidity']!==undefined){
        this.items['humidity']=this.weather_currently['currently']['humidity']
        this.items['humidityicon']="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-16-512.png"
    }
    if(this.weather_currently['currently']['pressure']!==undefined){
      this.items['pressure']=this.weather_currently['currently']['pressure']    
      this.items['pressureicon']="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-25-512.png" 
    }
    if(this.weather_currently['currently']['windSpeed']!==undefined){
      this.items['windspeed']=this.weather_currently['currently']['windSpeed']    
      this.items['windspeedicon']="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-27-512.png"  
    }
    if(this.weather_currently['currently']['visibility']!==undefined){
      this.items['visibility']=this.weather_currently['currently']['visibility']   
      this.items['visibilityicon']="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-30-512.png"       
    }
    if(this.weather_currently['currently']['cloudCover']!==undefined){
      this.items['cloudcover']=this.weather_currently['currently']['cloudCover'] 
      this.items['cloudcovericon']="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-28-512.png"
    }
    if(this.weather_currently['currently']['ozone']!==undefined){
      this.items['ozone']=this.weather_currently['currently']['ozone']   
      this.items['ozoneicon']="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-24-512.png"
    }
  }
}


displayHourlytab($event){
  this.favon=false;
  this.disp_currently=false;
  this.disp_weekly=false;
  this.disp_hourly=true;
  this.favon=false;
  this.favempty=false;
  if(this.chosenMod=="") console.log("temperature");
  this.modo();
}


public modo(){
  // console.log("inside mode from hourly!");
  console.log("inside modo func");
  console.log(this.chosenMod)
   if(this.chosenMod=="") this.chosenMod="temperature";
    if(this.chosenMod=="temperature" || this.chosenMod==""){
      console.log("temperature is selected");
      this.chosenMod="temperature"
      this.FillData(this.chosenMod);
    }
    else if(this.chosenMod=="pressure"){
      // console.log("pressure is selected");
      this.FillData(this.chosenMod);
    }
    else if(this.chosenMod=="windspeed"){
      // console.log("windspeed is selected");
      this.FillData(this.chosenMod);
    }
    else if(this.chosenMod=="ozone"){
      // console.log("ozone is selected");
      this.FillData(this.chosenMod);
    }
    else if(this.chosenMod=="visibility"){
      // console.log("visibility is selected");
      this.FillData(this.chosenMod);
    }
    else if(this.chosenMod=="humidity"){
      // console.log("humidity is selected");
      this.FillData(this.chosenMod);
    }
}

public FillData(mod){
  // console.log(this.weather_currently['hourly']['data'])
  // console.log("mod: ",mod);
  this.hours=[...Array(24).keys()];
  // console.log("hours: ",this.hours);
  // console.log("inside filldata: get char for ",mod);
  this.hourlydata=this.weather_currently['hourly']['data'];
  // console.log(this.hourlydata);
  if(mod=="temperature" || mod==""){
    for(var i=0;i<=23;i++){
      this.t[i]=this.hourlydata[i]['temperature'];
    }
    this.dataset=this.t;
    // console.log("mod data: ",this.t);
  }
  if(mod=="pressure"){
    for(var i=0;i<=23;i++){
      this.p[i]=this.hourlydata[i]['pressure'];
    }
    this.dataset=this.p;
    // console.log("mod data: ",this.p);
  }
  if(mod=="humidity"){
    for(var i=0;i<=23;i++){
      this.h[i]=this.hourlydata[i]['humidity'];
    }
    this.dataset=this.h;
    // console.log("mod data: ",this.h);
  }
  if(mod=="ozone"){
    for(var i=0;i<=23;i++){
      this.o[i]=this.hourlydata[i]['ozone'];
    }
    this.dataset=this.o;
    // console.log("mod data: ",this.o);
  }
  if(mod=="visibility"){
    for(var i=0;i<=23;i++){
      this.v[i]=this.hourlydata[i]['visibility'];
    }
    this.dataset=this.v;
    // console.log("mod data: ",this.v);
  }
  if(mod=="windspeed"){
    for(var i=0;i<=23;i++){
      this.w[i]=this.hourlydata[i]['windSpeed'];
    }
    this.dataset=this.w;
    // console.log("mod data: ",this.w);
  }
  // console.log("hours: ",this.hours);
  // console.log("data: ",this.dataset);

  this.makeBarchart(mod);
}

public makeBarchart(mod){
  // console.log("inside make barchart func");
  let setlabel={};
  if(mod=="temperature"){
    // console.log(mod);
    setlabel[mod]="Fahrenheit"
  }
  if(mod=="pressure"){
    setlabel[mod]="Millibars"
  }
  if(mod=="humidity"){
    setlabel[mod]="%"
  }
  if(mod=="ozone"){
    setlabel[mod]="Dobson Units"
  }
  if(mod=="visibility"){
    setlabel[mod]="Miles"
  }
  if(mod=="windspeed"){
    setlabel[mod]="Miles per hour"
  }

  this.BarChart = new Chart('barchart', {
  type: 'bar',
  data: {
   labels: this.hours,
   datasets: [{
       label: mod,
       data: this.dataset,
       backgroundColor:[
         'rgba(155,	205,	238, 0.8)',
         'rgba(155,	205,	238, 0.8)',
         'rgba(155,	205,	238, 0.8)',
         'rgba(155,	205,	238, 0.8)',
         'rgba(155,	205,	238, 0.8)',
         'rgba(155,	205,	238, 0.8)',
         'rgba(155,	205,	238, 0.8)',
         'rgba(155,	205,	238, 0.8)',
         'rgba(155,	205,	238, 0.8)',
         'rgba(155,	205,	238, 0.8)',
         'rgba(155,	205,	238, 0.8)',
         'rgba(155,	205,	238, 0.8)',
         'rgba(155,	205,	238, 0.8)',
         'rgba(155,	205,	238, 0.8)',
         'rgba(155,	205,	238, 0.8)',
         'rgba(155,	205,	238, 0.8)',
         'rgba(155,	205,	238, 0.8)',
         'rgba(155,	205,	238, 0.8)',
         'rgba(155,	205,	238, 0.8)',
         'rgba(155,	205,	238, 0.8)',
         'rgba(155,	205,	238, 0.8)',
         'rgba(155,	205,	238, 0.8)',
         'rgba(155,	205,	238, 0.8)',
         'rgba(155,	205,	238, 0.8)'
      ],
       borderWidth: 0
   }]
  }, 
  
  options: {
   scales: {
       yAxes: [{
           ticks: {
               beginAtZero:true
           },
           scaleLabel: {
            display: true,
            labelString: setlabel[mod]
          }
       }],
       xAxes: [{
        ticks: {
            beginAtZero:true
        },
        scaleLabel: {
         display: true,
         labelString: "Time(Hourly)"
       }
    }]

   }
  }
  });
  // console.log(this.BarChart);
}


public displayWeeklyChart(){
  this.disp_weekly=true;
  this.disp_hourly=false;
  this.disp_currently=false;
  this.favon=false;
  this.favempty=false;

  let weeklyjson=this.weather_currently['daily']['data'];

  for(var i=0;i<=7;i++){
    let jsdate = new Date(weeklyjson[i]['time'] * 1000);
    let date=jsdate.getDate().toString()+"/"+(jsdate.getMonth()+1).toString()+"/"+jsdate.getFullYear().toString();
    this.days.push(date);
    this.tmax.push(Math.round(weeklyjson[i]['temperatureMax']));
    this.tmin.push(Math.round(weeklyjson[i]['temperatureMin']));
  }
  // console.log("disp weekly is true: ",this.disp_weekly);

  this.weeklychart = new canvasjs.Chart('dispcontainer',{
    animationEnabled: true,
    dataPointWidth: 20,
    title: {
      text: "Weekly Weather"
    },
    axisY: {
      includeZero: true,
      title: "Temperature in Fahrenheit",
      gridThickness: 0,
      interval:10
    },
    axisX: {
      title: "Days",
      interval: 1
    },
    toolTip: {
      content: "{x} </br> Min: {y[0]}, Max: {y[1]}"
    },
    legend: {
      verticalAlign: "top"
    },
    data: [
    {
      color: "#9BCDEE",
      gridThickness: 0,
      type: "rangeBar",
      showInLegend: true,
      indexLabel: "{y[#index]}",
      legendText: "Day wise temperature range",
      toolTipContent: "<b>{label}</b>: {y[0]} to {y[1]}",
      dataPoints: [
        { x: 0, y:[this.tmin[0],this.tmax[0]], label: this.days[0] },
        { x: 1, y:[this.tmin[1],this.tmax[1]], label: this.days[1]  },
        { x: 2, y:[this.tmin[2],this.tmax[2]], label: this.days[2] },
        { x: 3, y:[this.tmin[3],this.tmax[3]], label: this.days[3]  },
        { x: 4, y:[this.tmin[4],this.tmax[4]], label: this.days[4] },
        { x: 5, y:[this.tmin[5],this.tmax[5]], label: this.days[5]  },
        { x: 6, y:[this.tmin[6],this.tmax[6]], label: this.days[6] },
        { x: 7, y:[this.tmin[7],this.tmax[7]], label: this.days[7]  }
      ],
      click:(event:any)=>{
        this.openthis(event);
    }
    }
    ]
  });
  this.weeklychart.render();
}

openthis(event){
  // console.log("openthis.event",event.dataPointIndex);
  // console.log(this.lat,this.long,this.time);
  this.apihandleservice.getDailyData(encodeURIComponent(this.lat),encodeURIComponent(this.long),encodeURIComponent(this.time)).subscribe((data:{})=>{
    console.log("daily weather json: ",data);
    // console.log(this.weather_currently['daily']['data'][event.dataPointIndex]);
    this.weather_daily=data['currently'];
    // console.log("daily currently: ",this.weather_daily);
    this.createModal();
  });
}

open(content){
  // this.apihandleservice.getDailyData(encodeURIComponent(this.lat),encodeURIComponent(this.long),encodeURIComponent(this.time)).subscribe((data:{})=>{

  //   this.createModal();
  // });
  // console.log("inside open modal");
  let jsdate = new Date(this.weather_daily['time'] * 1000);
  let date=jsdate.getDate().toString()+"/"+(jsdate.getMonth()+1).toString()+"/"+jsdate.getFullYear().toString();
  this.dailydatajson['time']=date;
  this.dailydatajson['city']=this.cityname;
  this.dailydatajson['temp']=this.weather_daily['temperature'];
  this.dailydatajson['summ']=this.weather_daily['summary'];
  this.dailydatajson['precip']=Math.round(this.weather_daily['precipIntensity']);
  this.dailydatajson['chanceofrain']=this.weather_daily['precipProbability']*100+"%";
  this.dailydatajson['windspeed']=Math.round(this.weather_daily['windSpeed'])+" mph";
  this.dailydatajson['humidity']=this.weather_daily['humidity']*100+" %";
  this.dailydatajson['visibility']=this.weather_daily['visibility']+" miles";

  let icon="";
  if(this.weather_daily['icon']=="clear-day" || this.weather_daily['icon']=="clear-night"){
    icon="https://cdn3.iconfinder.com/data/icons/weather-344/142/sun-512.png"
  }
  if(this.weather_daily['icon']=="rain"){
    icon="https://cdn3.iconfinder.com/data/icons/weather-344/142/rain-512.png"
  }
  if(this.weather_daily['icon']=="snow"){
    icon="https://cdn3.iconfinder.com/data/icons/weather-344/142/snow-512.png"
  }
  if(this.weather_daily['icon']=="sleet"){
    icon="https://cdn3.iconfinder.com/data/icons/weather-344/142/lightning-512.png"
  }
  if(this.weather_daily['icon']=="wind"){
    icon="https://cdn4.iconfinder.com/data/icons/the-weather-is-nicetoday/64/weather_10-512.png"
  }
  if(this.weather_daily['icon']=="fog"){
    icon="https://cdn3.iconfinder.com/data/icons/weather-344/142/cloudy-512.png"
  }
  if(this.weather_daily['icon']=="cloudy"){
    icon="https://cdn3.iconfinder.com/data/icons/weather-344/142/cloud-512.png"
  }
  if(this.weather_daily['icon']=="partly-cloudy-day" || this.weather_daily['icon']=="partly-cloudy-night"){
    icon="https://cdn3.iconfinder.com/data/icons/weather-344/142/sunny-512.png"
  }
 
  this.dailydatajson['icon']=icon;
  // console.log("my daily json data for modal: ",this.dailydatajson);

  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(result);
  }, (reason) => {
    console.log(reason);
  });
}


createModal(){
  // console.log("inside create modal");
  let element:HTMLElement=document.getElementById('openmodalbutton') as HTMLElement;
  element.click();
}

favpressed(){
  this.resClicked=false;
  this.showtabs=false;

  // let items=JSON.parse(localStorage.getItem("weatherstore"))
  // for (var i =0; i< items.length; i++) {
  //   if (items[i]["city"] == this.cityname) {
  //     this.instorage=true;
  //     this.notinstorage=false;
  //   }
  // }
  //hide showtabs and display fav table
  console.log("hide showtabs and display fav table")
  console.log(JSON.parse(localStorage.getItem("weatherstore")).length);
  if("weatherstore" in localStorage && JSON.parse(localStorage.getItem("weatherstore")).length>0){
    this.favouritejson=JSON.parse(localStorage.getItem("weatherstore"))
    this.favon=true;
    this.favempty=false;
  }
  else{
    console.log("no favourites")
    this.favempty=true;
    this.favon=false;
  }
  console.log(this.favon," ",this.favempty);
  console.log(this.resClicked,this.favon,this.cleardata,this.searchclick);
}

addfavourites(){
  this.instorage=true;
  this.notinstorage=false;
  let favjson={};
  favjson['seal']=this.weather_stateseal['items'][0]['link'];
  favjson['city']=this.cityname;
  favjson['state']=this.statename;
  favjson["lat"]=this.lat;
  favjson["long"]=this.long;
  console.log("favjson: ",favjson);

  var a = [];
  let duplicate=false;
  let keyexists=false;
  let nodata=true;
  // console.log(localStorage.getItem("weatherstore").length);
  let data=[];

  if("weatherstore" in localStorage && localStorage.getItem("weatherstore").length>0){
    // console.log("inside 1st if");
    keyexists=true;
    data=JSON.parse(localStorage.getItem("weatherstore"));
    // console.log(data);
    if(data.length>0){
      nodata=false;
      for(var i=0;i<data.length;i++){
        data[i]["id"]=i;
        if(data[i]["city"]==this.cityname){
          duplicate=true;
          console.log(this.cityname, " is already in my localstorage");
          break;
        }
          a.push(data[i]);
      }
      // console.log(a);
    }
  }

  if(keyexists && duplicate==false && localStorage.getItem("weatherstore").length>0){
    nodata=false;
    if(data.length==0){
       favjson['id']=0;
    }
    else{
      favjson['id']=data[data.length-1]["id"]+1;
    } 
    a.push(favjson);
    // console.log("after adding final data in a: ",a);
    localStorage.setItem("weatherstore", JSON.stringify(a));
    // console.log("after adding new data:",JSON.parse(localStorage.getItem("weatherstore")));
    this.favouritejson=JSON.parse(localStorage.getItem("weatherstore"))
    // console.log(this.favouritejson);
  }
  if(!keyexists){
    nodata=false;
    console.log("initially no key in local");
    favjson["id"]=0;
    a.push(favjson);
    localStorage.setItem("weatherstore", JSON.stringify(a));
    console.log("after adding new data:",JSON.parse(localStorage.getItem("weatherstore")));
    this.favouritejson=JSON.parse(localStorage.getItem("weatherstore"))
    // console.log(this.favouritejson);
  }

  console.log(JSON.stringify(this.favouritejson).length);
  if((keyexists && JSON.parse(localStorage.getItem("weatherstore")).length==0)){
    console.log("empty: ",data);
    this.favempty=true;
    this.favon=false;
    this.showtabs=false;
  }
  console.log("ls: ",JSON.parse(localStorage.getItem("weatherstore")));
  console.log(this.favon," ",this.favempty);
}

deletefavourite(data){
  this.instorage=false;
  this.notinstorage=true;
  let items=JSON.parse(localStorage.getItem("weatherstore"))
  let index=-1;
  console.log("before deletion:", data.id," : ",items);
  for (var i =0; i< items.length; i++) {
    if (items[i]["id"] == data["id"]) {
      index=i;
    }
  }
  items.splice(index, 1);
  console.log("after deletion: id: ",items);
  for(var i=0;i<items.length;i++){
    items[i]["id"]=i;
  } 
  // for(var i=0;i<items.length;i++){
  //   console.log(items[i]);
  // }

  localStorage.setItem("weatherstore", JSON.stringify(items));
  this.favouritejson=JSON.parse(localStorage.getItem("weatherstore"))
  if(JSON.parse(localStorage.getItem("weatherstore")).length==0){
    this.favon=false;
    this.favempty=true;
  }
  else{
    this.favempty=false;
    this.favon=true;
  }
  console.log("after deleting item: ",this.favouritejson);
}

respressed(){
  this.favon=false;
  this.showtabs=true;
  this.favempty=false;
  this.resClicked=true;
  console.log(this.resClicked,this.favon,this.cleardata,this.searchclick);
  this.createcurrentlycard()
}

displaydataofthatcity(event){
  this.resClicked=true;
  this.favon=false;
  this.showtabs=true;
  this.favempty=false;
  console.log("disp data of city: ",event)
  let elementId: string = (event.target as Element).id;
  elementId=JSON.parse(elementId)
  console.log(elementId["lat"])
    this.lat=elementId['lat'];
    this.long=elementId['long'];
    this.statename=elementId['state'];
    this.cityname=elementId['city'];

    this.favon=false;
    this.showtabs=true;
    this.favempty=false;
    console.log(this.lat," ",this.long)

    let items=JSON.parse(localStorage.getItem("weatherstore"))
    for (var i =0; i< items.length; i++) {
      if (items[i]["city"] == this.cityname) {
        this.instorage=true;
        this.notinstorage=false;
      }
    }
    if(!this.instorage){
      this.notinstorage=true;
    }

      this.apihandleservice.getWeatherData(encodeURIComponent(this.lat),encodeURIComponent(this.long)).subscribe((data:{})=>{
      this.weather_currently = data;
      this.time=this.weather_currently['currently']['time'];
      console.log(this.weather_currently)


          this.apihandleservice.getStateSeal(encodeURIComponent(this.statename)).subscribe((data:{})=>{
          this.weather_stateseal=data;

          console.log(this.weather_stateseal)
          this.createcurrentlycard();
        })
        
    })
}


// progressBar(){
//   let current_progress = 0
//   let step = 0.5; // the smaller this is the slower the progress bar
//   let interval = setInterval(function() {
//       current_progress += step;
//       let progress = Math.round(Math.atan(current_progress) / (Math.PI / 2) * 100 * 1000) / 1000
//       $(".progress-bar")
//           .css("width", progress + "%")
//           .attr("aria-valuenow", progress)
//           .text(progress + "%");
//       if (progress >= 100){
//           clearInterval(interval);
//       }else if(progress >= 70) {
//           step = 0.1
//       }
//   }, 100);
// }

}
