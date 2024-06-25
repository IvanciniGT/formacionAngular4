import { Component } from '@angular/core';
import { UsuarioComponent } from "../usuario/usuario.component";

// Esta anonotación le dice a Angular que esta clase es un componente: LENGUAJE DECLARATIVO
@Component({
    selector: 'app-root', // Esta es la marca html que estoy definendo. Llegados a este punto, podré comenzar a usar la marca <app-root> en mi html
    standalone: true, // (1)
    templateUrl: './app.component.html', // Indico la plantilla que usaré para RENDERIZAR este componente
    styleUrl: './app.component.css', // Asociando una hoja de estilos específica para este componente
    imports: [UsuarioComponent]
})
// Aquí va la lógica del componente
export class AppComponent {
/*
  Para que alguien use esta clase, deberá INSTANCIARLA: new AppComponent()
  Tengo escrito yo eso por algún lao???? NO
  Y entonces? Angular escribe ese código por mi. 
  Angular se encarga de instanciar mis componentes = INVERSION DE CONTROL.
  Cada vez que se use la marca HTML <app-root>, Angular instanciará un nuevo AppComponent,
  asociado a ese USO de la marca.

  Los componentes WEB (Según el estandar de W3C) tienen un ciclo de vida.
  Que hay que aprender:
  - constructor() -> Se ejecuta cuando se instancia el componente
         v
  - ngOnInit() -> Se ejecuta cuando el componente se inicia
         v
  - ngOnChanges() -> Se ejecuta cuando cambian las propiedades de entrada
         v
  - ngOnDestroy() -> Se ejecuta cuando el componente se destruye
*/
}

/*
 (1) Esto ha cambiado mucho en Angular. 
 Hoy en día, el modo standalone, es la forma por defecto de trabajar en Angular.
 Esto indica que estamos definiendo un WEB-COMPONENT (del estandar de la W3C).
 Este componente incluye todo lo necesario para funcionar, sin depender de nada más.
*/