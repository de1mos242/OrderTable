import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from './order.service';
import { HttpProviderService } from './http-provider.service';
import { AuthBackendService } from './auth-backend.service';
import { RateCardService } from './rate-card.service';
import { OrderPositionService } from './order-position.service';
import { RateCardPositionService } from './rate-card-position.service';
import { SharedModule } from '../shared/shared.module';
import { UserService } from './user.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [],
  providers: [
    AuthBackendService,
    UserService,
    HttpProviderService,
    RateCardService,
    OrderService,
    OrderPositionService,
    RateCardPositionService,
  ]
})
export class BackendModule {
}
