import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RateCardListComponent } from './rate-card-list/rate-card-list.component';
import { RateCardDetailComponent } from './rate-card-detail/rate-card-detail.component';
import { RateCardResolverService } from './rate-card-resolver.service';
import { RateCardEditComponent } from './rate-card-edit/rate-card-edit.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { RateCardOwnerGuard } from './rate-card-owner-guard.service';

const ordersRoutes: Routes = [
  {
    path: 'rate-cards/:id/edit',
    component: RateCardEditComponent,
    resolve: { rateCard: RateCardResolverService },
    canActivate: [ AuthGuard, RateCardOwnerGuard ]
  },
  {
    path: 'rate-cards/:id',
    component: RateCardDetailComponent,
    resolve: { rateCard: RateCardResolverService }
  },
  {
    path: 'rate-cards',
    component: RateCardListComponent
  }
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
export class RateCardsRoutingModule {
}
