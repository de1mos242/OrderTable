import { NgModule } from '@angular/core';
import {
  MdButtonModule, MdButtonToggleModule, MdCardModule, MdCheckboxModule, MdInputModule, MdSnackBarModule,
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
    MdCardModule,
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
    MdCardModule,
  ],
  declarations: []
})
export class MaterialExtModule {
}
