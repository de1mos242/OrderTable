import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RateCardListComponent } from './rate-card-list/rate-card-list.component';
import { RateCardsRoutingModule } from './rate-cards-routing.module';
import { RateCardDetailComponent } from './rate-card-detail/rate-card-detail.component';
import { RateCardResolverService } from './rate-card-resolver.service';
import { RateCardEditComponent } from './rate-card-edit/rate-card-edit.component';
import { MaterialExtModule } from '../material-ext/material-ext.module';
import { MdCardModule } from '@angular/material';
import { RateCardOwnerGuard } from './rate-card-owner-guard.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialExtModule,
    RateCardsRoutingModule,
    MdCardModule,
  ],
  declarations: [ RateCardListComponent, RateCardDetailComponent, RateCardEditComponent ],
  providers: [ RateCardResolverService, RateCardOwnerGuard ]
})
export class RateCardsModule {
}
