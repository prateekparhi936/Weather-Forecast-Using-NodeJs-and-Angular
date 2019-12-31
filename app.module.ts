import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormcompComponent } from './formcomp/formcomp.component';
import { WeathertabsComponent } from './weathertabs/weathertabs.component';
import { ApihandleserviceService } from './apihandleservice.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTabsModule,MatProgressBarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    FormcompComponent,
    WeathertabsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [ApihandleserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
