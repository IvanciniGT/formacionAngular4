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
  selector: 'typewriter',
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

  textoAMostrar: string = "";
  posicionPorLaQueVoy: number = 0;

  constructor() {
    this.estado = INICIADO;
  }

  ngOnInit() { // Esta función es llamada por Angular cuando el componente (La marquita HTML) se va a inyectar al DOM de mi página, antes de renderizarlo
    if(this.initialDelay > 0) 
      this.transicionar(COMENZAR_A_ESPERAR);
    else
      this.transicionar(COMENZAR_A_PINTAR_LETRITAS_DIRECTAMENTE);
  }

  // Implementar la máquina de estados. COMPRUEBA QUE LAS TRANSICIONES SEAN CORRECTAS... Y DEJA EL ESTADO DEL COMPONENTE EN EL ESTADO CORRECTO
   transicionar(accion: number) {
    switch (accion) {
      case COMENZAR_A_ESPERAR:
        if(this.initialDelay <= 0) throw new Error("No se puede transicionar de " + this.estado + " a " + COMENZAR_A_ESPERAR + " si initialDelay es menor o igual a 0");
        this.ejecutarTransicion(ESPERANDO_PINTAR, INICIADO, ()=>this.comenzarAEsperar() );
        break;
      case COMENZAR_A_PINTAR_LETRITAS_DIRECTAMENTE:
        if(this.initialDelay > 0) throw new Error("No se puede transicionar de " + this.estado + " a " + COMENZAR_A_PINTAR_LETRITAS_DIRECTAMENTE + " si initialDelay es mayor a 0");
        this.ejecutarTransicion(PINTANDO_LETRITAS, INICIADO, this.comenzarAPintarLetritasDirectamente.bind(this));
        break;
      case COMENZAR_A_PINTAR_LETRITAS:
        this.ejecutarTransicion(PINTANDO_LETRITAS, ESPERANDO_PINTAR, this.comenzarAPintarLetritas);
        break;
      case ACABAR_DE_PINTAR_LETRITAS:
        this.ejecutarTransicion(TERMINADO, PINTANDO_LETRITAS, ()=>this.acabarDePintarLetritas());
        break;
      case RECOMENZAR_A_PINTAR_LETRITAS:
        if(!this.loop) throw new Error("No se puede transicionar de " + this.estado + " a " + RECOMENZAR_A_PINTAR_LETRITAS + " si loop es false");
        this.ejecutarTransicion(PINTANDO_LETRITAS, TERMINADO, () => this.recomenzarAPintarLetritas() );
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
    setTimeout(() => this.transicionar(COMENZAR_A_PINTAR_LETRITAS), this.initialDelay);
  } 
  comenzarAPintarLetritasDirectamente() {
    this.irPintandoElTexto();
  }
  comenzarAPintarLetritas = () => this.irPintandoElTexto();

  recomenzarAPintarLetritas() {
    this.posicionPorLaQueVoy = 0;
    this.textoAMostrar = "";
    this.irPintandoElTexto();
  }

  acabarDePintarLetritas() {
    if(this.loop) 
      this.transicionar(RECOMENZAR_A_PINTAR_LETRITAS)
  }

  irPintandoElTexto() {
    this.posicionPorLaQueVoy++;
    if(this.posicionPorLaQueVoy > this.text.length) {
      this.transicionar(ACABAR_DE_PINTAR_LETRITAS);
      return;
    }
    this.textoAMostrar = this.text.substring(0, this.posicionPorLaQueVoy);
    setTimeout( () => this.irPintandoElTexto() , this.speed);
  }

}
