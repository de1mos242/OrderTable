import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderEventService } from './order-event.service';
import { HttpProviderService } from './http-provider.service';
import { AuthBackendService } from './auth-backend.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [
    AuthBackendService,
    HttpProviderService,
    OrderEventService
  ]
})
export class BackendModule {
}
