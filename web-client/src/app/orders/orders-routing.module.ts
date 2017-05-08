import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderModelResolver } from './order-model-resolver.service';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { OrderPositionsEditComponent } from './order-positions-edit/order-positions-edit.component';

const ordersRoutes: Routes = [
  {
    path: 'orders/:id/edit-positions',
    component: OrderPositionsEditComponent,
    resolve: { orderModel: OrderModelResolver },
    canActivate: [ AuthGuard ]
  },
  {
    path: 'orders/:id/edit',
    component: OrderEditComponent,
    resolve: { orderModel: OrderModelResolver },
    canActivate: [ AuthGuard ]
  },
  {
    path: 'orders/:id',
    component: OrderDetailComponent,
    resolve: { orderModel: OrderModelResolver }
  },
  {
    path: 'orders',
    component: OrdersListComponent
  }
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
