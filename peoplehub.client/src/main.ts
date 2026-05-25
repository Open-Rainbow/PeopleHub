import { provideHttpClient } from '@angular/common/http';
import { provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { registerIcons } from './libs/shared/common/src/lib/assets/icons/icon-registry';
import { appRoutes } from './app/routes/app.routes';

registerIcons();

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
  ]
})
  .catch(err => console.error(err));

