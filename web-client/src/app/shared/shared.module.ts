import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorNotFoundComponent } from './error-not-found/error-not-found.component';
import { AlertsService } from './alerts.service';
import { MaterialExtModule } from '../material-ext/material-ext.module';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialExtModule,
  ],
  declarations: [ ErrorNotFoundComponent, AccessDeniedComponent ],
  providers: [ AlertsService ]
})
export class SharedModule {
}
