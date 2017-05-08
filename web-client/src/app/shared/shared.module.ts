import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorNotFoundComponent } from './error-not-found/error-not-found.component';
import { AlertsService } from './alerts.service';
import { MaterialExtModule } from '../material-ext/material-ext.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialExtModule,
  ],
  declarations: [ ErrorNotFoundComponent ],
  providers: [ AlertsService ]
})
export class SharedModule {
}
