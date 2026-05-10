import { provideHttpClient } from '@angular/common/http';
import { provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import './libs/shared/common/src/lib/assets/icons/icon-registry';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true })
  ]
})
  .catch(err => console.error(err));
