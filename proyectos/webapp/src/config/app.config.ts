import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { UsuariosService } from '../services/usuarios/usuarios.service';
import { UsuariosServiceImpl } from '../services/usuarios/usuarios.service.impl';

// Nos permite configurar modulos/ comportamientos adicionales en nuestra aplicación Angular
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), { provide: UsuariosService, useClass: UsuariosServiceImpl }]
};

// Todas las configruaciones de Inyección de dependencias van a estar en este archivo.