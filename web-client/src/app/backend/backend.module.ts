import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderEventService } from './order-event.service';
import { HttpProviderService } from './http-provider.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [
    HttpProviderService,
    OrderEventService,
  ]
})
export class BackendModule { }
