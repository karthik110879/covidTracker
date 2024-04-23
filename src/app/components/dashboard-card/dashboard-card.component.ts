import { DecimalPipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent implements OnInit, OnChanges {

  @Input('totalConfirmed')
  totalConfirmed;
  @Input('totalActive')
  totalActive;
  @Input('totalRecovered')
  totalRecovered;
  @Input('totalDeaths')
  totalDeaths;

  constructor(
    private decimalPipe: DecimalPipe
  ) { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes) {
      this.totalConfirmed = this.decimalPipe.transform(this.totalConfirmed, '1.0-0');
      this.totalActive = this.decimalPipe.transform(this.totalActive, '1.0-0');
      this.totalRecovered = this.decimalPipe.transform(this.totalRecovered, '1.0-0');
      this.totalDeaths = this.decimalPipe.transform(this.totalDeaths, '1.0-0');
    }
  }
}
