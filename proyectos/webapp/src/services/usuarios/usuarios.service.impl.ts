import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuarios/usuario.model';
import { Observable, catchError, map, throwError } from 'rxjs';
import { DatosNuevoUsuario } from '../../models/usuarios/datos.nuevo.usuario.model';
import { UsuariosService } from './usuarios.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UsuarioBackend } from '../../models/backend/usuarios/usuario.model';
import { UsuarioMappers } from '../../mappers/usuarios/usuario.mappers';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';

@Injectable({
  providedIn: 'root',
})
export class UsuariosServiceImpl extends UsuariosService{

  readonly URL_BASE = 'http://local host:3000/usuarios';
//  private readonly URL_BASE = environment.apiUrl;

  constructor(private clienteHttp: HttpClient,
              private usuarioMapper: UsuarioMappers
  ) {
    super();
  }

  solicitarRegistro(datosDeAltaDeUsuario:DatosNuevoUsuario): Observable<void> {
    return this.clienteHttp.post<void>(this.URL_BASE, datosDeAltaDeUsuario);
    // No estamos controlando errores..
    // AQUI es donde ahora montaremos los MAPEADORES !
  }

  getUsuario(id:number): Observable<Usuario> {
    return this.clienteHttp.get<UsuarioBackend>(`${this.URL_BASE}/${id}`)
          .pipe(map(this.usuarioMapper.usuarioBackend2Usuario))
          // Map lo que hace es, partiendo de un observable de un tipo A
          // Aplicar una función de mapeo para que devolvamos un observable de un tipo B
          // Necesito discriminar entre:
          // - Errores del servidor: 5?? El servicio no esta disponible. Intenta más tarde
          // - Errores de cliente:   4?? Tus datos son una mierda.. revísalos
          .pipe(catchError((error: HttpErrorResponse) => {
            // Quizás aquí mando el error a mi servicio (frontal) de gestión de errores
            if(error.status >= 500) {
              return throwError(()=>'Error en el servidor');
            }else if(error.status >= 400) {
              return throwError(()=>'Error en los datos');
            }else{
              return throwError(()=>'Error desconocido');
            }
          }));

  }

  saveUsuario(usuario: Usuario) : Observable<Usuario>{
    const usuarioBackend = this.usuarioMapper.usuario2UsuarioBackend(usuario);
    return this.clienteHttp.put<UsuarioBackend>(`${this.URL_BASE}/${usuario?.id}`, usuarioBackend)
          .pipe(map(this.usuarioMapper.usuarioBackend2Usuario));

  }

}

// Me estoy cagando de nuevo en otro de los principios SOLID.
// I: Interface Segregation Principle
// Muchas interfaces específicas son mejores que una general.

// D: Dependency Inversion Principle
// Un componente de Alto nivel (Componente Web Signup) no debe depender de implementaciones 
// de un componente de bajo nivel (UsuariosServiceImpl)
// Ambos deben depender de abstracciones (Interfaces/clases abstractas): UsuariosService