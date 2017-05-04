import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from './order.service';
import { HttpProviderService } from './http-provider.service';
import { AuthBackendService } from './auth-backend.service';
import { RateCardService } from './rate-card.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [
    AuthBackendService,
    HttpProviderService,
    RateCardService,
    OrderService
  ]
})
export class BackendModule {
}
