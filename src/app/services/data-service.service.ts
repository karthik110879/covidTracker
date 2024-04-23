import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from "rxjs/operators";
import { globalDataSummary } from '../models/global-data';
import { DateWiseData } from '../models/date-wise-data';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataServiceService {
    private baseUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/';
    private baseUrl_V2 = environment.base_url;
    private globalDataUrl = '';
    private dateWiseDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';
    private extension = '.csv';
    month: number;
    date: number;
    year: number;


    getDate(date: number) {
        if (date < 10) {
            return `0${date}`
        }
        return date
    }

    constructor(private http: HttpClient) {
        let now = new Date();
        this.month = now.getMonth() + 1;
        this.date = now.getDate() - 1;
        this.year = now.getFullYear(); 

        this.globalDataUrl = `${this.baseUrl}${'02-23-2023'}${this.extension}`
        console.log(this.globalDataUrl); 
    }

    handleError(error: HttpErrorResponse) {
        if (error.status == 404) {
            let now = new Date();
            now.setDate(now.getDate() - 1);
            now.setHours(-1);
            this.month = now.getMonth();
            this.date = now.getDate();
            this.year = now.getFullYear();
            // this.globalDataUrl = `${this.baseUrl}${this.getDate(this.month)}-${this.getDate(this.date)}-${this.year}${this.extension}`;
            this.globalDataUrl = `${this.baseUrl}${'02'}-${'23'}-${'2023'}${this.extension}`;
            return this.getGlobalData();
        }
    }

    getDatwWiseData() {
        return this.http.get(this.dateWiseDataUrl, { responseType: 'text' })
            .pipe(map(result => {
                let rows = result.split('\n');
                //console.log(rows);
                let mainData = {};
                let header = rows[0];
                let dates = header.split(/,(?=\S)/);
                dates.splice(0, 4);
                rows.splice(0, 1);
                rows.forEach(row => {
                    let cols = row.split(/,(?=\S)/);
                    let con = cols[1];
                    cols.splice(0, 4);
                    //console.log(con , cols);
                    mainData[con] = [];
                    cols.forEach((value, index) => {
                        let dw: DateWiseData = {
                            cases: +value,
                            country: con,
                            date: new Date(Date.parse(dates[index]))
                        }
                        mainData[con].push(dw)
                    })

                })



                //console.log(mainData);



                return mainData;
            }))
    }

    getGlobalData(): Observable<any> {
        let headers = new HttpHeaders({
            'X-RapidAPI-Key': '31bcaa3ac8msh6e2a7a19925c46ap1bd627jsn07bb10ca18b2',
            'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
        });

        return this.http.get<any>(this.baseUrl_V2 + 'countries', { headers }); 
    }

    getGlobalStatistics():Observable<any>  {
        let headers = new HttpHeaders({
            'X-RapidAPI-Key': '31bcaa3ac8msh6e2a7a19925c46ap1bd627jsn07bb10ca18b2',
            'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
        });

        return this.http.get<any>(this.baseUrl_V2 + 'statistics', { headers }); 
    }

}
