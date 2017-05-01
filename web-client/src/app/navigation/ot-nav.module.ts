import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {MaterialExtModule} from '../material-ext/material-ext.module';

@NgModule({
  imports: [
    MaterialExtModule,
    CommonModule
  ],
  declarations: [NavBarComponent],
  exports: [
    NavBarComponent
  ]
})
export class NavigationModule { }
