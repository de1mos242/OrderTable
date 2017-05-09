import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { OrderService } from '../backend/order.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class OrderIsOwnerGuard implements CanActivate {

  constructor(private authService: AuthService, private orderService: OrderService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Promise<boolean> {
    const currentUser = this.authService.currentUser.getValue();
    return this.orderService.getOrder(route.params.id).toPromise().then(orderModel => {
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
    );

  }

  moveToAccessDenied() {
    this.router.navigate([ '/access-denied' ]);
  }
}
