import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersListComponent } from './orders-list/orders-list.component';

const ordersRoutes: Routes = [
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
