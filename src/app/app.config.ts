import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import LaraDarkBlue from '@primeng/themes/lara';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ngrokHeaderInterceptor } from './interceptors/ngrok-header-interceptor.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: LaraDarkBlue,
        options: {
          darkModeSelector: '.my-app-dark'
        }
      },
      zIndex: {
        modal: 1100,
        overlay: 1000,
        menu: 1000,
        tooltip: 1100
      }
    }),
    provideHttpClient(
      withInterceptors([ngrokHeaderInterceptor])
    )
  ]
};
