import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { RateCard } from '../models/rate-card.model';
import { RateCardService } from '../backend/rate-card.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RateCardResolverService implements Resolve<RateCard> {
  constructor(private rateCardService: RateCardService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<RateCard> {
    const id = +route.params[ 'id' ];
    return this.rateCardService.getById(id).catch(error => {
      if (error && error.hasOwnProperty('status') && error.status === 404) {
        this.router.navigate([ '/not-found' ]);
      }
      throw error;
    });
  }
}
