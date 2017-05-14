import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {MaterialExtModule} from '../material-ext/material-ext.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    MaterialExtModule,
    SharedModule,
    CommonModule,
  ],
  declarations: [NavBarComponent],
  exports: [
    NavBarComponent
  ]
})
export class NavigationModule { }
