import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GoogleChartsConfig } from 'angular-google-charts/lib/models/google-charts-config.model';
import { globalDataSummary } from 'src/app/models/global-data';
import { StatisticsResponse } from 'src/app/models/statistic.model';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  loading:boolean = true;
  globalStatsData:any[];
  datatable = [];
  defaultCaseType:string = 'confirmed'
  chart = {
    PieChart : "PieChart" ,
    ColumnChart : 'ColumnChart' ,
    LineChart : "LineChart", 
    height: 500, 
    options: {
      color: ['#99999'],
      animation:{
        duration: 1000,
        easing: 'out',
        
      },
      legend: {
        position: 'bottom',
        textStyle: {
            color: 'black',
            fontSize: 13,
            fontName: 'ro'
        }
      },
      hAxis: {title: 'Life Expectancy'},
      vAxis: {title: 'Fertility Rate'},
      bubble: {textStyle: {fontSize: 11}},
      is3D: true
    }  
  }

  countries:string[] = null;
  
  constructor(
    private dataService: DataServiceService,
   
  ) { }

  ngOnInit(): void { 
    this.getAllCountries();
    this.getStats()
  }

  getStats() {
    this.dataService.getGlobalStatistics().subscribe({
      next:(data) => {
        console.log('data', data.response);
        const response: any[] = data.response;
        this.globalStatsData = response;
        this.globalStatsData.forEach((country:StatisticsResponse) => {
          if(country.country === 'All') {
            this.totalConfirmed = country.cases.total !== null ? country.cases.total : 0;
            this.totalActive = country.cases.active !== null ? country.cases.active : 0;
            this.totalRecovered = country.cases.recovered !== null ? country.cases.recovered : 0;
            this.totalDeaths = country.deaths.total !== null ? country.deaths.total : 0;
          }
        })
        this.loading = false;
      }
    })
  }

  getAllCountries() {
    this.dataService.getGlobalData().subscribe({
      next: (data) => { 
        console.log('data', data.response);
        this.countries = data.response;
        
      },
      error: (err) => {
        console.log('err', err);
        this.loading = false; 
      }
    })
  }



  updateChart(event: any) { 
    console.log('EVENT VALUE', event.target.value);
    const selection = event.target.value;
    this.initChart(selection)
  }

  initChart(caseType: string) {
    this.defaultCaseType = caseType;
    
    this.datatable = [];
    // this.datatable.push(["Country", "Cases"])

    this.globalStatsData.forEach((countrystats: StatisticsResponse) => {
      if(countrystats.country !== 'All') {
        let value: number;
        console.log('countrystats', countrystats); 
        switch (this.defaultCaseType) {
          case 'confirmed':
            value = countrystats.cases.total !== null ? countrystats.cases.total : 0 ; 
            break;
          case 'deaths':
            value = countrystats.deaths.total  !== null ? countrystats.deaths.total : 0 ;
            break;
          case 'recoverd':
            value = countrystats.cases.recovered  !== null ? countrystats.cases.recovered : 0 ;
            break;
          case 'active':
            value = countrystats.cases.active  !== null ? countrystats.cases.active : 0 
            break; 
          default:
            break;
        }
  
        this.datatable.push([
          countrystats.country, value
        ])
      }
    })
    console.log(this.datatable);

  }


}
