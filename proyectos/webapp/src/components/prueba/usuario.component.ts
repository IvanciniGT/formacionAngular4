import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'prueba',
  standalone: true,
  imports: [],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent /*implements OnInit*/ { 
                              // En versiones anteriores de Angular era oblitorio hacer esta implementación
                              // para que se ejecutara el método ngOnInit()
                              // Hoy en día, Angular ya lo hace por nosotros
  // Estas propiedades que definimos aquí se guardan a nivel de cada instancia de este componente
  // En automático, en cuanto una propiedad definida a nivel de mi componente cambie,
  // Angular se encarga de actualizar la vista. Reejecuta la plantilla.
  // Internamente eso se hace invocando el método render() de mi componente.
  nombre: string = 'Juan'; 
  edad: number = 0;

  // Queremos que desde fuera, me puedan dar valores a alguna propiedad, por ejemplo el id
  @Input() id!: number ; // Te la dan, te la dan! Te lo digo yo!

  constructor() { 
    // Cada vez que se use la marca HTML <usuario>, 
    // Angular instanciará un new UsuarioComponent()
    // Y al hacerlo, se llama en automático al constructor
    console.log('Se ha instanciado el componente Usuario '+ this.nombre);
  }

  ngOnInit() {
    console.log('Se ha iniciado el componente Usuario ' + this.nombre);
  }

  incrementarEdad() {
    this.edad++;
  }

}
