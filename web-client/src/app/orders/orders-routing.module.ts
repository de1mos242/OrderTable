import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderModelResolver } from './order-model-resolver.service';

const ordersRoutes: Routes = [
  { path: 'orders/:id', component: OrderDetailComponent, resolve: { orderModel: OrderModelResolver } },
  { path: 'orders', component: OrdersListComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ordersRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class OrdersRoutingModule {
}
