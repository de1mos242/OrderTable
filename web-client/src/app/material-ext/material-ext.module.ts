import { NgModule } from '@angular/core';
import {
  MdButtonModule, MdButtonToggleModule, MdCheckboxModule, MdInputModule, MdSnackBarModule,
  MdToolbarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    MdButtonToggleModule,
    MdSnackBarModule,
    FormsModule,
    FlexLayoutModule,
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdInputModule,
  ],
  exports: [
    RouterModule,
    MdButtonToggleModule,
    MdSnackBarModule,
    FormsModule,
    FlexLayoutModule,
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdInputModule,
  ],
  declarations: []
})
export class MaterialExtModule {
}
