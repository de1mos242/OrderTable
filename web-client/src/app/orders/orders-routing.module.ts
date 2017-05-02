import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { AuthGuard } from '../auth/auth-guard.service';

const ordersRoutes: Routes = [
  { path: 'orders', component: OrdersListComponent, canActivate: [ AuthGuard ] }
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
