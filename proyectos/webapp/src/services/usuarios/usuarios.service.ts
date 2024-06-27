import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuarios/usuario.model';
import { Observable } from 'rxjs';
import { DatosNuevoUsuario } from '../../models/usuarios/datos.nuevo.usuario.model';

//@Injectable({
//  providedIn: 'root'
//})
export abstract class UsuariosService {

  abstract solicitarRegistro(datosDeAltaDeUsuario:DatosNuevoUsuario): Observable<void> ;

  abstract getUsuario(email: string): Observable<Usuario> ; // Esto hará que la función sea asincrona... Como si fuera una promesa

}

// Me estoy cagando de nuevo en otro de los principios SOLID.
// I: Interface Segregation Principle
// Muchas interfaces específicas son mejores que una general.

// D: Dependency Inversion Principle
// Un componente de Alto nivel (Componente Web Signup) no debe depender de implementaciones 
// de un componente de bajo nivel (UsuariosServiceImpl)
// Ambos deben depender de abstracciones (Interfaces/clases abstractas): UsuariosService