import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather';
  showtabs:boolean;
  ischecked:boolean;
  jsonformdata:any;
  searchclick:boolean;
  cleardata:boolean;
  resultpressed:boolean;
  favtab:boolean;

  constructor() {
    this.jsonformdata={};
    this.showtabs=false;
    this.favtab=false;
    this.ischecked=false;
    this.searchclick=false;
    this.cleardata=false;
    this.resultpressed=false;
  }





  clearformemit(){
    this.showtabs=false;
    this.searchclick=false;
    this.jsonformdata={};
    this.ischecked=false;
    this.cleardata=true;
    this.favtab=false;
  }




  displayformdataemit(event){
    console.log("form submit emit app root: ",event);
    this.jsonformdata=event;
    this.favtab=false;
    if(event.currLoc==true){
      this.ischecked=true;
    }
    else{
      this.ischecked=false;
    }
    this.showtabs=true;
    this.cleardata=false;
    this.searchclick=true;
  }

  resultemit(){
    console.log("result emit in app root");
    this.resultpressed=true;
  }

}
