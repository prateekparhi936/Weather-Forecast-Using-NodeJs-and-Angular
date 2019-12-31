import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef, Input, Output, EventEmitter, AfterViewInit} from '@angular/core';
import {ApihandleserviceService} from '../apihandleservice.service';


import {FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators,ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-formcomp',
  templateUrl: './formcomp.component.html',
  styleUrls: ['./formcomp.component.css']
})

export class FormcompComponent implements AfterViewInit {


  states:any;
  jsonData:any;
  formsubmitted: boolean
  currloc_checked:boolean
  cities:any;
  cityjson:{};
  prediction:any;

  @Output() formdataemit = new EventEmitter<any>();
  @Output() searchclicked = new EventEmitter<any>();
  @Output() clearemit=new EventEmitter();
  // @Output() resemit=new EventEmitter();
  // @Output() favemit=new EventEmitter();

  
  @ViewChild('CityName', {static: false}) cityRef: ElementRef;
  constructor(private _apihandle: ApihandleserviceService) { 
    this.prediction=[];
    this.currloc_checked=false;
    this.cities=[];
    this.states =[
      {name:"Alabama",id:"AL"},
      {name:"Arkansas",id:"Arkansas"},
      {name:"Arizona",id:"Arizona"},
      {name:"Alaska",id:"Alaska"},
      {name:"California",id:"California"},
      {name:"Connecticut",id:"Connecticu"},
      {name:"Delaware",id:"Delaware"},
      {name:"District of Columbia",id:"District of Columbia"},
      {name:"Florida",id:"Florida"},
      {name:"Georgia",id:"Georgia"},
      {name:"Hawaii",id:"Hawaii"},
      {name:"Idaho",id:"Idaho"},
      {name:"IL",id:"Illinois"},
      {name:"Indiana",id:"Indiana"},
      {name:"Iowa",id:"Iowa"},
      {name:"Kansas",id:"Kansas"},
      {name:"Kentucky",id:"Kentucky"},
      {name:"Louisiana",id:"Louisiana"},
      {name:"Maine",id:"Maine"},
      {name:"Maryland",id:"Maryland"},
      {name:"Massachusetts",id:"Massachusetts"},
      {name:"Michigan",id:"Michigan"},
      {name:"Minnesota",id:"Minnesota"},
      {name:"Mississippi",id:"Mississippi"},
      {name:"Missouri",id:"Missouri"},
      {name:"Montana",id:"Montana"},
      {name:"Nevada",id:"Nevada"},
      {name:"New Hampshire",id:"New Hampshire"},
      {name:"New Jersey",id:"New Jersey"},
      {name:"New Mexico",id:"New Mexico"},
      {name:"New York",id:"New York"},
      {name:"North Carolina",id:"North Carolina"},
      {name:"North Dakota",id:"North Dakota"},
      {name:"Ohio",id:"Ohio"},
      {name:"Oklahona",id:"Oklahoma"},
      {name:"Oregon",id:"Oregon"},
      {name:"Pennsylvania",id:"Pennsylvania"},
      {name:"Rhode Island",id:"Rhode Island"},
      {name:"South Carolina",id:"South Carolina"},
      {name:"South Dakota",id:"South Dakota"},
      {name:"Tennesse",id:"Tennesse"},
      {name:"Texas",id:"Texas"},        
      {name:"Utah",id:"Utah"},
      {name:"Vermont",id:"Vermont"},
      {name:"Virginia",id:"Virginia"},
      {name:"Washington",id:"Washington"},
      {name:"West Virginia",id:"West Virginia"},
      {name:"Wisconsin",id:"Wisconsin"},
      {name:"Wyoming",id:"Wyoming"}
    ];

  }

  clearForm(myForm){
    this.currloc_checked=false;
    myForm.reset();
    this.clearemit.emit();
  }

  filledfields(myForm){
    // console.log(myForm);
  }

  checkboxSelected(event){
    if(event.target.checked==true){
      this.currloc_checked=true;
    }
    else{
      this.currloc_checked=false;
    }
  }

  submitForm(myForm){
    this.formdataemit.emit(myForm.value);
  }

  // respressed(){
  //   console.log("inside result in formcomp");
  //   this.resemit.emit();
  // }


  // favpressed(){
  //   console.log("inside fav in formcomp");
  //   this.favemit.emit();
  // }

  getCitiesAuto(event){
    this._apihandle.getAutocompletedata(encodeURIComponent(event.target.value)).subscribe((data:{})=>{
      this.cityjson=data;
      // console.log(data);
      // console.log("city: "+event.target.value);
      this.prediction=data['predictions'];

      for(var i=0;i<5;i++){
        this.cities[i]=this.prediction[i].structured_formatting.main_text;
      }
      // console.log("suggesions: ",this.cities);
      // console.log("cityjson: ",this.cityjson);
      // console.log("inside getcitiesauto");
  })
}

  ngAfterViewInit() {
    console.log("inside after view init");
    // console.log(this.cityRef.nativeElement.innerHTML); 
    // this.cityRef.nativeElement.innerHTML = ; 
  }

}
