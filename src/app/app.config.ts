// import { ApplicationConfig, provideZoneChangeDetection, provideBrowserGlobalErrorListeners } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { provideHttpClient } from '@angular/common/http';

// import { routes } from './app.routes';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideBrowserGlobalErrorListeners(),
//     provideRouter(routes),
//     provideHttpClient()
//   ]
// };


import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core'; // <-- Updated stable name
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(), // <-- This activates ultra-fast stable zoneless operations
    provideRouter(routes), 
    provideHttpClient()    
  ]
};