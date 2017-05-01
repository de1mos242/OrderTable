import {NgModule} from '@angular/core';
import {MdButtonModule, MdCheckboxModule, MdToolbarModule} from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
  ],
  declarations: []
})
export class MaterialExtModule {
}
