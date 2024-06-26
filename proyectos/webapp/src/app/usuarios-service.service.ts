import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosServiceService {

  readonly url:string = 'http://localhost:3000/usuarios';

  constructor() { }

  solicitarRegistro(datosDeAltaDeUsuario: DatosDeAltaDeUsuario): void {
    // Y Aqui haré la mierda que tenga que hacer.. contra mi servidor
  }
}
