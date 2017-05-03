import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { OrderModel } from '../models/order-event.model';
import { OrderService } from '../backend/order.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrderModelResolver implements Resolve<OrderModel> {
  constructor(private orderService: OrderService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<OrderModel> {
    const id = +route.params['id'];
    return this.orderService.getOrder(id).catch(error => {
      if (error && error.hasOwnProperty('status') && error.status === 404) {
        this.router.navigate(['/not-found']);
      }
      throw error;
    });
  }

}
