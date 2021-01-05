import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { merge, forkJoin, combineLatest   } from 'rxjs';
import { map, mergeAll } from 'rxjs/operators';
import { DateWiseData } from 'src/app/models/date-wise-data';
import { globalDataSummary } from 'src/app/models/global-data';
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
  selectedCountryData : DateWiseData[];
  dateWiseData;
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

    merge(
      this.service.getDatwWiseData().pipe(
        map(result=>{
          this.dateWiseData = result;
        })
      ), 
      this.service.getGlobalData().pipe(map(result=>{
        this.data = result;
        this.data.forEach(cs=>{
          this.countries.push(cs.country)
        })
      }))
    ).subscribe(
      {
        complete : ()=>{
         this.updateValues('Afghanistan')
         this.loading = false;
        }
      }
    )
    
    
    
  } 

  updateChart(){
    let dataTable = [];
    dataTable.push(["Date" , 'Cases'])
    this.selectedCountryData.forEach(cs=>{
      dataTable.push([cs.date , cs.cases])
    })

    this.initChart()
  }

  updateValues(country : string){
    console.log(country);
    this.data.forEach(cs=>{
      if(cs.country == country){
        this.totalActive = cs.active
        this.totalDeaths = cs.deaths
        this.totalRecovered = cs.recovered
        this.totalConfirmed = cs.confirmed
      }
    })

    this.selectedCountryData  = this.dateWiseData[country]
    // console.log(this.selectedCountryData);
    this.updateChart();
    
  }



  initChart() {

    this.datatable = [];
    // this.datatable.push(["Country", "Cases"])
    
    this.selectedCountryData.forEach(cs => {
      let value :Date ;

        if (cs.cases > 2000)
          value = cs.date
        
        this.datatable.push([
            cs.country, value
          ])
    })
    console.log(this.datatable);

  }

}
