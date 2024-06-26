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

  @Input() text!: string;                           // OK
  @Input() speed: number = 100;                     // OK
  @Input() textClass: string = "";
  @Input() cursor: string = "_";                    // OK
  @Input() cursorBlinkSpeed: number = 500;          // OK
  @Input() cursorClass: string = "";
  @Input() hideCursorOnComplete: boolean = true;    // OK
  @Input() initialDelay: number = 0;                // OK
  @Input() loop: boolean = false;                   // OK

  private estado: number;
  private posicionPorLaQueVoy: number = 0;
  private tareaDeParpadeoDelCursor: any;

  textoAMostrar: string = "";
  mostrarCursor: boolean = true;

  constructor() {
    this.estado = INICIADO;
  }

  ngOnInit() { // Esta función es llamada por Angular cuando el componente (La marquita HTML) se va a inyectar al DOM de mi página, antes de renderizarlo
    if (this.initialDelay > 0)
      this.transicionar(COMENZAR_A_ESPERAR);
    else
      this.transicionar(COMENZAR_A_PINTAR_LETRITAS_DIRECTAMENTE);
  }

  // Implementar la máquina de estados. COMPRUEBA QUE LAS TRANSICIONES SEAN CORRECTAS... Y DEJA EL ESTADO DEL COMPONENTE EN EL ESTADO CORRECTO
  private transicionar(accion: number) {
    switch (accion) {
      case COMENZAR_A_ESPERAR:
        // Valido el estado en el que estoy, para ver si puedo ejecutar esa transición: TREANSICION VALIDA
        // Hacemos otras comprobaciones requeridas para la transición
        // Asignar el nuevo estado
        // Ejecutar la función asociada a la transición
        if (this.initialDelay <= 0) throw new Error("No se puede transicionar de " + this.estado + " a " + COMENZAR_A_ESPERAR + " si initialDelay es menor o igual a 0");
        this.ejecutarTransicion(ESPERANDO_PINTAR, INICIADO, () => this.comenzarAEsperar());
        break;
      case COMENZAR_A_PINTAR_LETRITAS_DIRECTAMENTE:
        if (this.initialDelay > 0) throw new Error("No se puede transicionar de " + this.estado + " a " + COMENZAR_A_PINTAR_LETRITAS_DIRECTAMENTE + " si initialDelay es mayor a 0");
        this.ejecutarTransicion(PINTANDO_LETRITAS, INICIADO, this.comenzarAPintarLetritasDirectamente.bind(this));
        break;
      case COMENZAR_A_PINTAR_LETRITAS:
        this.ejecutarTransicion(PINTANDO_LETRITAS, ESPERANDO_PINTAR, this.comenzarAPintarLetritas);
        break;
      case ACABAR_DE_PINTAR_LETRITAS:
        this.ejecutarTransicion(TERMINADO, PINTANDO_LETRITAS, () => this.acabarDePintarLetritas());
        break;
      case RECOMENZAR_A_PINTAR_LETRITAS:
        if (!this.loop) throw new Error("No se puede transicionar de " + this.estado + " a " + RECOMENZAR_A_PINTAR_LETRITAS + " si loop es false");
        this.ejecutarTransicion(PINTANDO_LETRITAS, TERMINADO, () => this.recomenzarAPintarLetritas());
        break;
      default:
        console.error("Estado no válida");
    }
  }

  private ejecutarTransicion(estadoDestino: number, estadoEsperado: number, funcionAsociada: Function) {
    if (this.estado !== estadoEsperado) {
      throw new Error("No se puede transicionar de " + this.estado + " a " + estadoDestino);
    }
    this.estado = estadoDestino;
    funcionAsociada();
  }

  // Declarar las funciones asociadas a cada transición
  private comenzarAEsperar() {
    setTimeout(() => this.transicionar(COMENZAR_A_PINTAR_LETRITAS), this.initialDelay);
  }

  private comenzarAPintarLetritasDirectamente() {
    this.comenzarParpadeoDelCursor();
    this.irPintandoElTexto();
  }

  private comenzarAPintarLetritas = () => {
                                            this.comenzarParpadeoDelCursor();
                                            this.irPintandoElTexto();
                                          }

  private recomenzarAPintarLetritas() {
    this.posicionPorLaQueVoy = 0;
    this.textoAMostrar = "";
    this.mostrarCursor = true;
    this.comenzarParpadeoDelCursor();
    this.irPintandoElTexto();
  }

  private acabarDePintarLetritas() {
    this.finalizarParpadeoDelCursor();
    if (this.loop)
      this.transicionar(RECOMENZAR_A_PINTAR_LETRITAS)
  }

  private irPintandoElTexto() {
    this.posicionPorLaQueVoy++;
    if (this.posicionPorLaQueVoy > this.text.length) {
      this.transicionar(ACABAR_DE_PINTAR_LETRITAS);
      return;
    }
    this.textoAMostrar = this.text.substring(0, this.posicionPorLaQueVoy); // En automático, al tocar esta variable que uso en el html, se re renderiza el componente (Me lo regala angular = GUAY !)
    setTimeout(() => this.irPintandoElTexto(), this.speed);
  }

  // El parpadeo del cursor lo podemos gestionar mediante un estilo css: visibility: hidden; visibility: visible;
  // Solamente parpadeamos cuando cursorBlinkSpeed sea mayor a 0.
  private comenzarParpadeoDelCursor(){
    if(this.cursorBlinkSpeed > 0){
        // Quiero que se vaya cambiando la variable mostrarCursor cada X tiempo... de forma regular (con una periodicidad)
        this.tareaDeParpadeoDelCursor=setInterval( ()=> this.mostrarCursor = !this.mostrarCursor, this.cursorBlinkSpeed );
    }
  }

  private finalizarParpadeoDelCursor(){
    if(this.tareaDeParpadeoDelCursor){ // Siempre que hago un clearInterval, me aseguro de que el interval exista
    // En JS hay un tipo especial de if, en el que solo pongo la variable... no pongo condició.
    // En estos casos, lo  que JS comprueba es si la variable tiene asignado o no un valor (undefined o no)
      clearInterval(this.tareaDeParpadeoDelCursor); // Anular el temporizador... ya no se sigue ejecutando
    }
    this.mostrarCursor = !this.hideCursorOnComplete; // Dejo o no el cursor mostrandose, en base al valor de hideCursorOnComplete
    // TODO: Estéticamente va a quedar raro... Nos va a interesar otro comportamiento
  }

}

// Principios SOLID DE DESARROLLO DE SOFTWARE:
// S: Principio de responsabilidad única (Single Responsability Principle)
  // Un componente (clase, función, módulo, paquete) solo debe tener UNA UNICA RESPONSABILIDAD y por ende una razón para cambiar
// D: Principio de inversión de dependencias