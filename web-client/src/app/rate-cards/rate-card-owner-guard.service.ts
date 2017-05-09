import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { RateCardService } from '../backend/rate-card.service';

@Injectable()
export class RateCardOwnerGuard implements CanActivate {

  constructor(private authService: AuthService, private rateCardService: RateCardService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Promise<boolean> {
    const currentUser = this.authService.currentUser.getValue();
    return this.rateCardService.getById(route.params.id).toPromise().then(rateCard => {
        if (rateCard != null && currentUser != null) {
          if (rateCard.owner.id === currentUser.id) {
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
