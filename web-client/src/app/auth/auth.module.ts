import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { MaterialExtModule } from '../material-ext/material-ext.module';
import { UserCredentialsStorageService } from './user-credentials-storage.service';

@NgModule({
  imports: [
    MaterialExtModule,
    AuthRoutingModule,
    CommonModule
  ],
  declarations: [LoginComponent],
  providers: [ AuthGuard, AuthService, UserCredentialsStorageService ]
})
export class AuthModule { }
