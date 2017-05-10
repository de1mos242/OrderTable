import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { OrderService } from '../backend/order.service';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/combineLatest';

@Injectable()
export class OrderIsOwnerGuard implements CanActivate {

  constructor(private authService: AuthService, private orderService: OrderService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    const onGetAuth = this.authService.onAuthUpdate();
    const onGetOrder = this.orderService.getOrder(route.params.id);

    return Observable.combineLatest(onGetAuth, onGetOrder).map(([ currentUser, orderModel ]) => {
        if (orderModel != null && currentUser != null) {
          if (orderModel.owner.id === currentUser.id) {
            return true;
          } else {
            this.moveToAccessDenied();
            return false;
          }
        } else {
          this.moveToAccessDenied();
          return false;
        }
      }
    ).catch(_ => Observable.of([false]));

  }

  moveToAccessDenied() {
    this.router.navigate([ '/access-denied' ]);
  }
}
