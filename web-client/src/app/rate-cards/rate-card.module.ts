import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RateCardListComponent } from './rate-card-list/rate-card-list.component';
import { RateCardsRoutingModule } from './rate-cards-routing.module';
import { RateCardDetailComponent } from './rate-card-detail/rate-card-detail.component';
import { RateCardResolverService } from './rate-card-resolver.service';
import { RateCardEditComponent } from './rate-card-edit/rate-card-edit.component';
import { MaterialExtModule } from '../material-ext/material-ext.module';
import { MdCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MaterialExtModule,
    RateCardsRoutingModule,
    MdCardModule
  ],
  declarations: [ RateCardListComponent, RateCardDetailComponent, RateCardEditComponent ],
  providers: [ RateCardResolverService ]
})
export class RateCardsModule {
}
