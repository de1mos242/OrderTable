import { NgModule } from '@angular/core';
import {
  MdAutocompleteModule,
  MdButtonModule, MdButtonToggleModule, MdCardModule, MdCheckboxModule, MdDialogModule, MdGridListModule, MdIconModule,
  MdInputModule,
  MdListModule,
  MdSnackBarModule, MdTabsModule,
  MdToolbarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MdTabsModule,
    MdIconModule,
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
    MdDialogModule,
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    MdTabsModule,
    MdIconModule,
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
    MdDialogModule,
  ],
  declarations: []
})
export class MaterialExtModule {
}
