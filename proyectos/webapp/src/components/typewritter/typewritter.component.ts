import { Component, Input } from '@angular/core';

// Estados
const INICIADO = 0;
const ESPERANDO_PINTAR = 1;
const PINTANDO_LETRITAS = 2;
const TERMINADO = 3;

// Transiciones entre estados (flechitas del diagrama de estados)
const COMENZAR_A_ESPERAR = 0;
const COMENZAR_A_PINTAR_LETRITAS_DIRECTAMENTE = 1;
const COMENZAR_A_PINTAR_LETRITAS = 2;
const ACABAR_DE_PINTAR_LETRITAS = 3;
const RECOMENZAR_A_PINTAR_LETRITAS = 4;

@Component({
  selector: 'app-typewritter',
  standalone: true,
  imports: [],
  templateUrl: './typewritter.component.html',
  styleUrl: './typewritter.component.css'
})
export class TypewritterComponent {

  @Input() text!: string;
  @Input() speed: number = 100;
  @Input() textClass: string = "";
  @Input() cursor: string = "_";
  @Input() cursorBlinkSpeed: number = 500;
  @Input() cursorClass: string = "";
  @Input() hideCursorOnComplete: boolean = true;
  @Input() initialDelay: number = 0;
  @Input() loop: boolean = false;

  private estado: number;

  constructor() {
    this.estado = INICIADO;
  }

  // Implementar la máquina de estados. COMPRUEBA QUE LAS TRANSICIONES SEAN CORRECTAS... Y DEJA EL ESTADO DEL COMPONENTE EN EL ESTADO CORRECTO
 
  transicionar(accion: number) {
    switch (accion) {
      case COMENZAR_A_ESPERAR:
        this.ejecutarTransicion(ESPERANDO_PINTAR, INICIADO, this.comenzarAEsperar);
        break;
      case COMENZAR_A_PINTAR_LETRITAS_DIRECTAMENTE:
        this.ejecutarTransicion(PINTANDO_LETRITAS, INICIADO, this.comenzarAPintarLetritasDirectamente);
        break;
      case COMENZAR_A_PINTAR_LETRITAS:
        this.ejecutarTransicion(PINTANDO_LETRITAS, ESPERANDO_PINTAR, this.comenzarAPintarLetritas);
        break;
      case ACABAR_DE_PINTAR_LETRITAS:
        this.ejecutarTransicion(TERMINADO, PINTANDO_LETRITAS, this.acabarDePintarLetritas);
        break;
      case RECOMENZAR_A_PINTAR_LETRITAS:
        this.ejecutarTransicion(PINTANDO_LETRITAS, TERMINADO, this.recomenzarAPintarLetritas);
        break;
      default:
        console.error("Estado no válida");
    }
  }
  ejecutarTransicion(estadoDestino: number, estadoEsperado: number, funcionAsociada: Function) {
    if(this.estado !== estadoEsperado) {
      throw new Error("No se puede transicionar de " + this.estado + " a " + estadoDestino);
    }
      this.estado = estadoDestino;
      funcionAsociada();
  }

  // Declarar las funciones asociadas a cada transición
  comenzarAEsperar() {

  }
  comenzarAPintarLetritasDirectamente() {

  }
  comenzarAPintarLetritas() {

  }
  acabarDePintarLetritas() {

  }
  recomenzarAPintarLetritas() {

  }

}
