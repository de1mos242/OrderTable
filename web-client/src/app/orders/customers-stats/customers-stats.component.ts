import { Component, Input, OnInit } from '@angular/core';
import { CustomerStats } from '../../models/customer-stats.model';

@Component({
  selector: 'ot-customers-stats',
  templateUrl: './customers-stats.component.html',
  styleUrls: [ './customers-stats.component.css' ]
})
export class CustomersStatsComponent implements OnInit {

  @Input() customersStats: CustomerStats[];

  @Input() totalSum: number;

  constructor() {
  }

  ngOnInit() {
  }

}
