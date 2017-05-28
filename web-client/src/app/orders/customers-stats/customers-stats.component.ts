import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomerStats } from '../../models/customer-stats.model';
import { User } from '../../models/user.model';
import { MdDialog } from '@angular/material';
import { EditPaidSumDialogComponent } from '../dialogs/edit-paid-sum-dialog/edit-paid-sum-dialog.component';
import { OrderPaymentService } from '../../backend/order-payment.service';
import { OrderPayment } from '../../models/order-payment.model';
import { OrderModel } from '../../models/order-event.model';

@Component({
  selector: 'ot-customers-stats',
  templateUrl: './customers-stats.component.html',
  styleUrls: [ './customers-stats.component.css' ]
})
export class CustomersStatsComponent {

  @Input() customersStats: CustomerStats[];

  @Input() totalSum: number;

  @Input() totalPaid: number;

  @Input() canEditPayments: boolean;

  @Input() orderModel: OrderModel;

  @Output() onChangeStats: EventEmitter<number> = new EventEmitter();

  constructor(private dialog: MdDialog, private paymentService: OrderPaymentService) {
  }

  editPayment(stats: CustomerStats) {
    const suggestedValue = (stats.totalSum - stats.paidSum);
    const editDialog = this.dialog.open(EditPaidSumDialogComponent, {
      data: {
        initialValue: suggestedValue
      }
    });
    editDialog.afterClosed().subscribe(result => {
      if (result.type === 'Ok') {
        const num_value = Number(result.value);
        if (num_value !== 0) {
          this.updatePayment(stats, stats.paidSum + num_value);
        }
      }
    });
  }

  updatePayment(stats: CustomerStats, newPaidSum: number) {
    const payment: OrderPayment = new OrderPayment();
    payment.paidSum = newPaidSum;
    payment.orderEventId = this.orderModel.id;
    payment.customerId = stats.customer.id;
    this.paymentService.setPayment(payment).then(retPayment => this.onChangeStats.emit(this.orderModel.id));
  }

}
