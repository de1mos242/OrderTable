import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth/auth.service';
import { OrderService } from '../../backend/order.service';
import { OrderModel } from '../../models/order-event.model';
import { User } from '../../models/user.model';

@Injectable()
export class CanEditOrderPositionsGuard implements CanActivate {
  constructor(private authService: AuthService, private orderService: OrderService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    const onGetAuth = this.authService.onAuthUpdate();
    const onGetOrder = this.orderService.getOrder(route.params.id);

    return Observable.combineLatest(onGetAuth, onGetOrder).map(([ currentUser, orderModel ]: [ User, OrderModel ]) => {
        if (orderModel.status !== 'BUILD') {
          this.moveToAccessDenied();
          return false;
        }
        if (orderModel != null && currentUser != null) {
          if (orderModel.owner.id === currentUser.id) {
            return true;
          } else if (orderModel.participants.indexOf(currentUser.id) >= 0) {
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
    ).catch(_ => {
      this.moveToAccessDenied();
      return Observable.of([ false ]);
    });

  }

  moveToAccessDenied() {
    this.router.navigate([ '/access-denied' ]);
  }
}
