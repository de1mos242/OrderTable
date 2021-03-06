import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { MaterialExtModule } from '../material-ext/material-ext.module';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderModelResolver } from './order-model-resolver.service';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { OrderPositionsEditComponent } from './order-positions-edit/order-positions-edit.component';
import { OrderParticipantManagerComponent } from './order-participant-manager/order-participant-manager.component';
import { InviteGuard } from './guards/invite-guard.service';
import { CustomersStatsComponent } from './customers-stats/customers-stats.component';
import { GroupedPositionsComponent } from './grouped-positions/grouped-positions.component';
import { OrderRateCardsManagerComponent } from './order-rate-cards-manager/order-rate-cards-manager.component';
import { CanEditOrderPositionsGuard } from './guards/can-edit-order-positions-guard.service';
import { OrderIsOwnerGuard } from './guards/order-is-owner-guard.service';
import { OrderStatusPipe } from './pipes/order-status.pipe';
import { SetOrderStatusLabelPipe } from './pipes/set-order-status-label.pipe';
import { SharedModule } from '../shared/shared.module';
import { EditPaidSumDialogComponent } from './dialogs/edit-paid-sum-dialog/edit-paid-sum-dialog.component';
import { AddOrderPositionDialogComponent } from './dialogs/add-order-position-dialog/add-order-position-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MaterialExtModule,
    SharedModule,
  ],
  declarations: [ OrdersListComponent,
                  OrderDetailComponent,
                  OrderEditComponent,
                  OrderPositionsEditComponent,
                  OrderParticipantManagerComponent,
                  CustomersStatsComponent,
                  GroupedPositionsComponent,
                  OrderRateCardsManagerComponent,
                  OrderStatusPipe,
                  SetOrderStatusLabelPipe,
                  EditPaidSumDialogComponent,
                  AddOrderPositionDialogComponent ],
  providers: [ OrderModelResolver, InviteGuard, CanEditOrderPositionsGuard, OrderIsOwnerGuard ],
  entryComponents: [ EditPaidSumDialogComponent, AddOrderPositionDialogComponent ]
})
export class OrdersModule {
}
