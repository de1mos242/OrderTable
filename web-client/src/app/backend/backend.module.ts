import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from './order.service';
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
    OrderService
  ]
})
export class BackendModule {
}
