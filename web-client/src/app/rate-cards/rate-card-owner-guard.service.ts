import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { RateCardService } from '../backend/rate-card.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RateCardOwnerGuard implements CanActivate {

  constructor(private authService: AuthService, private rateCardService: RateCardService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    const onGetAuth = this.authService.onAuthUpdate();
    const onGetRateCard = this.rateCardService.getById(route.params.id);

    return Observable.combineLatest(onGetAuth, onGetRateCard).map(([ currentUser, rateCard ]) => {
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
    ).catch(_ => Observable.of([ false ]));

  }

  moveToAccessDenied() {
    this.router.navigate([ '/access-denied' ]);
  }

}
