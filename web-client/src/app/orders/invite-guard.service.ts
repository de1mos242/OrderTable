import { Injectable } from '@angular/core';
import { OrderService } from '../backend/order.service';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class InviteGuard implements CanActivate {

  constructor(private orderService: OrderService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Promise<boolean> {
    return this.orderService.inviteParticipant(route.params.id, route.params.token).then(data => true);
  }


}
