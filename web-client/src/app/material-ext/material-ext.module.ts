import { NgModule } from '@angular/core';
import { MdButtonModule, MdCheckboxModule, MdInputModule, MdSnackBarModule, MdToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    MdSnackBarModule,
    FormsModule,
    FlexLayoutModule,
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdInputModule,
  ],
  exports: [
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
