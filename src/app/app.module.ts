import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CountriesComponent } from './components/countries/countries.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { FooterComponent } from './components/footer/footer.component';
import { DecimalPipe } from '@angular/common';

import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CountriesComponent,
    DashboardCardComponent,
    FeedbackComponent,
    FooterComponent
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleChartsModule,   
  ],
  providers: [
    DecimalPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
