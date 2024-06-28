import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuarios/usuario.model';
import { Observable } from 'rxjs';
import { DatosNuevoUsuario } from '../../models/usuarios/datos.nuevo.usuario.model';
import { UsuariosService } from './usuarios.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuariosServiceImpl extends UsuariosService{

//  readonly URL_BASE = 'http://localhost:3000/usuarios';
  private readonly URL_BASE = environment.apiUrl;

  constructor(private clienteHttp: HttpClient) {
    super();
  }

  solicitarRegistro(datosDeAltaDeUsuario:DatosNuevoUsuario): Observable<void> {
    return this.clienteHttp.post<void>(this.URL_BASE, datosDeAltaDeUsuario);
    // No estamos controlando errores..
    // AQUI es donde ahora montaremos los MAPEADORES !
  }

  getUsuario(id:number): Observable<Usuario> {

    return this.clienteHttp.get<Usuario>(`${this.URL_BASE}/${id}`);

  }
  saveUsuario(usuario: Usuario | undefined) : Observable<Usuario>{
    return this.clienteHttp.put<Usuario>(`${this.URL_BASE}/${usuario?.id}`, usuario);
  }


}

// Me estoy cagando de nuevo en otro de los principios SOLID.
// I: Interface Segregation Principle
// Muchas interfaces específicas son mejores que una general.

// D: Dependency Inversion Principle
// Un componente de Alto nivel (Componente Web Signup) no debe depender de implementaciones 
// de un componente de bajo nivel (UsuariosServiceImpl)
// Ambos deben depender de abstracciones (Interfaces/clases abstractas): UsuariosService