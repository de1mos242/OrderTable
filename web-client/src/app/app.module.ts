import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'hammerjs';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExtModule } from './material-ext/material-ext.module';
import { NavigationModule } from './navigation/ot-nav.module';
import { OrdersModule } from './orders/orders.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { BackendModule } from './backend/backend.module';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@angular/router';
import { RateCardsModule } from './rate-cards/rate-card.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule,
    MaterialExtModule,
    AuthModule,
    BackendModule,
    OrdersModule,
    RateCardsModule,
    NavigationModule,
    SharedModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
