import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

// Nos permite configurar modulos/ comportamientos adicionales en nuestra aplicación Angular
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
