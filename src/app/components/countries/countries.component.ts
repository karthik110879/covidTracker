import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { merge, forkJoin, combineLatest   } from 'rxjs';
import { map, mergeAll } from 'rxjs/operators';
import { DateWiseData } from 'src/app/models/date-wise-data';
import { globalDataSummary } from 'src/app/models/global-data';
import { StatisticsResponse } from 'src/app/models/statistic.model';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  totalActive = 0;
  totalRecovered = 0;
  totalConfirmed = 0;
  totalDeaths = 0;
  selectedCountryData:StatisticsResponse;
  selectedCountry:string = '';
  dateWiseData;
  globalStatsData:any[];
  loading = true;
  data :any =[];
  countries: string[] = [];
  datatable = [];
  chart = {
    LineChart : "LineChart", 
    height: 500, 
    options: {
      title: 'Date Wise Data',
      curveType: 'function',
      hAxis: {
        title: 'Countries'
      },
      vAxis: {
        title: 'Active'
      },
      animation:{
        duration: 1000,
        easing: 'out',
      },
      is3D: true
    }  
  }


  constructor(private service : DataServiceService) { }

  ngOnInit(): void { 
    // merge(
    //   this.service.getDatwWiseData().pipe(
    //     map(result=>{
    //       this.dateWiseData = result;
    //     })
    //   ), 
    //   this.service.getGlobalData().pipe(map(result=>{
    //     this.data = result;
    //     this.data.forEach(cs=>{
    //       this.countries.push(cs.country)
    //     })
    //   }))
    // ).subscribe(
    //   {
    //     complete : ()=>{
    //      this.updateValues('Afghanistan')
    //      this.loading = false;
    //     }
    //   }
    // )


    this.getAllCountries();
    this.getStats()

  } 

  getAllCountries() {
    this.service.getGlobalData().subscribe({
      next: (data) => { 
        console.log('data', data.response);
        this.countries = data.response; 
        this.loading = false;
      },
      error: (err) => {
        console.log('err', err);
        this.loading = false; 
      }
    })
  }

  getStats() {
    this.service.getGlobalStatistics().subscribe({
      next:(data) => {
        console.log('getGlobalStatistics data', data.response);
        const response: any[] = data.response;
        this.globalStatsData = response;
        this.selectedCountry = this.globalStatsData[0]?.country; 
        const index = this.globalStatsData.findIndex((country:StatisticsResponse) => country.country === this.selectedCountry);
        if(index !== -1) {
          this.selectedCountryData = this.globalStatsData[index];

          this.totalConfirmed = this.selectedCountryData.cases.total !== null ? this.selectedCountryData.cases.total : 0;
          this.totalActive = this.selectedCountryData.cases.active !== null ? this.selectedCountryData.cases.active : 0;
          this.totalRecovered = this.selectedCountryData.cases.recovered !== null ? this.selectedCountryData.cases.recovered : 0;
          this.totalDeaths = this.selectedCountryData.deaths.total !== null ? this.selectedCountryData.deaths.total : 0;
        }
        this.updateChart();
        this.loading = false;
      },
      error: (err) => {
        console.log('err', err);
        this.loading = false; 
      }
    })
  }

  updateChart(){
    let dataTable = [];
    dataTable.push(["Date" , 'Cases'])
    dataTable.push([this.selectedCountryData.day , this.selectedCountryData.cases])
    // this.selectedCountryData.forEach(cs=>{
    // })

    this.initChart()
  }

  updateValues(selectedCountry : string){
    console.log('SELECTED VALUE', selectedCountry);
    this.selectedCountry = selectedCountry; 

    const index = this.globalStatsData.findIndex((country:StatisticsResponse) => country.country === selectedCountry);

    if(index !== -1) { 
      this.selectedCountryData = this.globalStatsData[index];

      this.totalConfirmed = this.selectedCountryData.cases.total !== null ? this.selectedCountryData.cases.total : 0;
      this.totalActive = this.selectedCountryData.cases.active !== null ? this.selectedCountryData.cases.active : 0;
      this.totalRecovered = this.selectedCountryData.cases.recovered !== null ? this.selectedCountryData.cases.recovered : 0;
      this.totalDeaths = this.selectedCountryData.deaths.total !== null ? this.selectedCountryData.deaths.total : 0;
    } 

    this.updateChart(); 
  }



  initChart() {

    this.datatable = [];
    // this.datatable.push(["Country", "Cases"])
    
    // this.selectedCountryData.forEach(cs => {
    //   let value :Date ;

    //     if (cs.cases > 2000)
    //       value = cs.date
        
    //   })
    this.datatable.push([ this.selectedCountryData.country, this.selectedCountryData.day ])
    console.log('initChart',this.datatable);

  }

}
