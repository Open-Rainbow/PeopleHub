import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AccessService, roleHeaderInterceptor } from 'common';
import { UI_FIELD_POLICY } from 'ui';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/routes/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    // Sends the signed-in role so the API can enforce the Setup page's access rules.
    provideHttpClient(withInterceptors([roleHeaderInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    // Shared form controls read Setup's field rules (hidden / read-only / required) from here.
    { provide: UI_FIELD_POLICY, useExisting: AccessService },
  ]
})
  .catch(err => console.error(err));
