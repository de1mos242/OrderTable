import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { MaterialExtModule } from '../material-ext/material-ext.module';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderModelResolver } from './order-model-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MaterialExtModule
  ],
  declarations: [ OrdersListComponent, OrderDetailComponent ],
  providers: [ OrderModelResolver ]
})
export class OrdersModule {
}
