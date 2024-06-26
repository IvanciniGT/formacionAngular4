import { AfterViewInit, Component } from '@angular/core';
import { UsuarioComponent } from "../usuario/usuario.component";
import { TypewritterComponent } from "../typewritter/typewritter.component";

// Esta anonotación le dice a Angular que esta clase es un componente: LENGUAJE DECLARATIVO
@Component({
    selector: 'app-root', // Esta es la marca html que estoy definendo. Llegados a este punto, podré comenzar a usar la marca <app-root> en mi html
    standalone: true, // (1)
    templateUrl: './app.component.html', // Indico la plantilla que usaré para RENDERIZAR este componente
    styleUrl: './app.component.css',
    imports: [UsuarioComponent, TypewritterComponent]
})
// Aquí va la lógica del componente
export class AppComponent /*implements AfterViewInit*/{
       texto: string = "Soy un texto superguay";
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
  - ngOnInit() -> Se ejecuta cuando el componente se inicia. INICIALIAZCION DE DATOS
         v     
   -ngAfterViewInit() -> Se ejecuta cuando el componente ya se ve por pantalla: COSAS QUE QUIERO QUE OCURRAN POR PANTALLA
         v
  - ngOnChanges() -> Se ejecuta cuando cambian las propiedades de entrada
         v
  - ngOnDestroy() -> Se ejecuta cuando el componente se destruye
*/
       ngAfterViewInit() { // Se invoca 1 vez después de que el componente haya sido pinchado en el dom del navegador... y ya se vea por pantalla
              console.log("El componente ya se ve por pantalla");
              setTimeout(() => {
                     console.log("Han pasado 5 segundos... cambio el texto");
                     this.texto = "Soy otro texto más superguay";
              }, 5000);
       }


}

/*
 (1) Esto ha cambiado mucho en Angular. 
 Hoy en día, el modo standalone, es la forma por defecto de trabajar en Angular.
 Esto indica que estamos definiendo un WEB-COMPONENT (del estandar de la W3C).
 Este componente incluye todo lo necesario para funcionar, sin depender de nada más.
*/