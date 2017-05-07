import { NgModule } from '@angular/core';
import {
  MdAutocompleteModule,
  MdButtonModule, MdButtonToggleModule, MdCardModule, MdCheckboxModule, MdInputModule, MdListModule, MdSnackBarModule,
  MdToolbarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MdAutocompleteModule,
    MdListModule,
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
    ReactiveFormsModule,
    MdAutocompleteModule,
    MdListModule,
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
