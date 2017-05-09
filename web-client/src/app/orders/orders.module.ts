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
import { InviteGuard } from './invite-guard.service';
import { CustomersStatsComponent } from './customers-stats/customers-stats.component';
import { GroupedPositionsComponent } from './grouped-positions/grouped-positions.component';
import { OrderRateCardsManagerComponent } from './order-rate-cards-manager/order-rate-cards-manager.component';
import { OrderParticipantGuard } from './order-participant-guard.service';
import { OrderIsOwnerGuard } from './order-is-owner-guard.service';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MaterialExtModule
  ],
  declarations: [ OrdersListComponent,
                  OrderDetailComponent,
                  OrderEditComponent,
                  OrderPositionsEditComponent,
                  OrderParticipantManagerComponent,
                  CustomersStatsComponent,
                  GroupedPositionsComponent,
                  OrderRateCardsManagerComponent ],
  providers: [ OrderModelResolver, InviteGuard, OrderParticipantGuard, OrderIsOwnerGuard ]
})
export class OrdersModule {
}
