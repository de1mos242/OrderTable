import { Component, Input, OnInit } from '@angular/core';
import { OrderGroupedPosition } from '../../models/order-grouped-position.model';

@Component({
  selector: 'ot-grouped-positions',
  templateUrl: './grouped-positions.component.html',
  styleUrls: [ './grouped-positions.component.css' ]
})
export class GroupedPositionsComponent implements OnInit {

  @Input() groupedPositions: OrderGroupedPosition[];

  @Input() totalSum: number;

  constructor() {
  }

  ngOnInit() {
  }

}
