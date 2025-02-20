import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter, Route } from '@angular
import { provideHttpClient } from '@angular/common/http';
import { ProductComponent } from '../product/product.component';

// const routes: Route = [
//   { path: '', component: Home},
//   { path: 'manage', component: ProductComponent};
// ]

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideHttpClient()]
};
