import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuarios/usuario.model';
import { Observable } from 'rxjs';
import { DatosNuevoUsuario } from '../../models/usuarios/datos.nuevo.usuario.model';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosServiceImpl extends UsuariosService{

  solicitarRegistro(datosDeAltaDeUsuario:DatosNuevoUsuario): Observable<void> {
    console.log("Llamando al servidor...")
    return new Observable( observer => { // equivalente al new Promise((resolve, reject) => {})
                                         // En lugar de un resolve y reject, tenemos un next y un error
                                         console.log("Programando la llamada al servidor...")
      setTimeout(() => {
        console.log("He acabado de llamar al servidor...")
        observer.next(); // Mando valor... en nuestro caso ninguna valor: Solo mandamos un HE ACABADO!
        observer.complete();
      }, 5000);

    })
  }

  getUsuario(email: string): Observable<Usuario> {
    return Observable.create();
  }

}

// Me estoy cagando de nuevo en otro de los principios SOLID.
// I: Interface Segregation Principle
// Muchas interfaces específicas son mejores que una general.

// D: Dependency Inversion Principle
// Un componente de Alto nivel (Componente Web Signup) no debe depender de implementaciones 
// de un componente de bajo nivel (UsuariosServiceImpl)
// Ambos deben depender de abstracciones (Interfaces/clases abstractas): UsuariosService