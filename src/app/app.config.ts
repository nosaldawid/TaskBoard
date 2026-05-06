import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    // provideRouter — rejestruje router w aplikacji i podaje mu definicje tras
    // withComponentInputBinding() — feature flag włącza automatyczne przekazywanie parametrów trasy do inputów komponentu
    provideRouter(routes, withComponentInputBinding())
  ]
};
