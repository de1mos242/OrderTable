import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorNotFoundComponent } from './shared/error-not-found/error-not-found.component';
import { AccessDeniedComponent } from './shared/access-denied/access-denied.component';

const appRoutes: Routes = [
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '', redirectTo: '/orders', pathMatch: 'full' },
  { path: '**', component: ErrorNotFoundComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
}
