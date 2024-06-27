import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

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
const FORZAR_REINICIO_REPINTADO = 5;

@Component({
  selector: 'typewriter',
  standalone: true,
  imports: [],
  templateUrl: './typewritter.component.html',
  styleUrl: './typewritter.component.css'
})
export class TypewritterComponent {
  private _text!: string;
  
  @Input() set text(value: string) {
    const hayUnCambioReal = this._text !== undefined;
    this._text = value;
    if(hayUnCambioReal){
      this.transicionar(FORZAR_REINICIO_REPINTADO);
    }
  }
  @Input() speed: number = 100;
  @Input() textClass: string = "";
  @Input() cursor: string = "_";
  @Input() cursorBlinkSpeed: number = 500;
  @Input() cursorClass: string = "";
  @Input() hideCursorOnComplete: boolean = true;
  @Input() initialDelay: number = 0;
  @Input() loop: boolean = false;

  // Para que los componentes que usaan este, puedan enterarse de que ha terminado la animación, 
  // podemos emitir un evento cuando se termina de pintar el texto.
  @Output() finished: EventEmitter<void> = new EventEmitter<void>();
  // El emisor de eventos, podría mandar información adicional, asociada al evento.
  // Si fuera así, en lugar de void, usaríamos un tipo de dato que represente esa información adicional.

  // Las propiedades INPUT se asignan al inicializarse el componente
  // Después, en nuestro caso, queremos permitir que se puedan cambiar (el texto: `text`)

  private estado: number;
  private posicionPorLaQueVoy: number = 0;
  private tareaDeParpadeoDelCursor: any;
  private tareaDeEsperaOPintado: any;

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
/*
  ngOnChanges(changes: SimpleChanges) { // En versiones antiguas, era necesario implementar la interfaz OnChanges
    // Asi definida, esta funcion se dispararía cada vez que UNA PROPIEDAD DE ENTRADA CAMBIE
    // La primera ve que se asignan las propiedades de entrada, esta función se dispara
    //console.log("Ha cambiado una propiedad de entrada");
    if (changes["text"] && changes["text"].previousValue !== undefined) { // Me aseguro que la prop que sste cambiando sea el texto, y que sea un cambio real, de un texto a otro... no de undefined a un texto
      //console.log("El texto ha cambiado, " + changes["text"].previousValue + " -> " + changes["text"].currentValue);
      this.transicionar(FORZAR_REINICIO_REPINTADO);
    }
    // En algunos casos esta función puede quedar muy sobrecargada.
    // Mira si ha cambiado el parametro 1.
    // Mira si ha cambiado el parametro 2.
    // Mira si ha cambiado el parametro 3.
    // Lo podemos gestionar de otra forma.. basado en el concepto de props de JS
  }
*/
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
        this.ejecutarTransicion(PINTANDO_LETRITAS,TERMINADO, () => this.recomenzarAPintarLetritas());
        break;
      case FORZAR_REINICIO_REPINTADO:
        this.ejecutarTransicion(PINTANDO_LETRITAS, [TERMINADO, ESPERANDO_PINTAR, PINTANDO_LETRITAS], () => this.recomenzarAPintarLetritas());
        break;
      default:
        console.error("Estado no válida");
    }
  }

  private ejecutarTransicion(estadoDestino: number, estadoEsperado: number | number[], funcionAsociada: Function) {
    if (Array.isArray(estadoEsperado)) {
      if (!estadoEsperado.includes(this.estado)) {
        throw new Error("No se puede transicionar de " + this.estado + " a " + estadoDestino);
      }
    }
    else if (this.estado !== estadoEsperado) {
      throw new Error("No se puede transicionar de " + this.estado + " a " + estadoDestino);
    }
    this.estado = estadoDestino;
    funcionAsociada();
  }

  // Declarar las funciones asociadas a cada transición
  private comenzarAEsperar() {
    this.tareaDeEsperaOPintado=setTimeout(() => this.transicionar(COMENZAR_A_PINTAR_LETRITAS), this.initialDelay);
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
    this.anularTareasProgramadas();
    this.comenzarParpadeoDelCursor();
    this.irPintandoElTexto();
  }

  private acabarDePintarLetritas() {
    this.finalizarParpadeoDelCursor();
    if (this.loop)
      this.transicionar(RECOMENZAR_A_PINTAR_LETRITAS)
    this.finished.emit(); // Emitimos un evento de finalización de la animación
  }

  private irPintandoElTexto() {
    this.posicionPorLaQueVoy++;
    if (this.posicionPorLaQueVoy > this._text.length) {
      this.transicionar(ACABAR_DE_PINTAR_LETRITAS);
      return;
    }
    this.textoAMostrar = this._text.substring(0, this.posicionPorLaQueVoy); // En automático, al tocar esta variable que uso en el html, se re renderiza el componente (Me lo regala angular = GUAY !)
    this.tareaDeEsperaOPintado=setTimeout(() => this.irPintandoElTexto(), this.speed);
  }

  // El parpadeo del cursor lo podemos gestionar mediante un estilo css: visibility: hidden; visibility: visible;
  // Solamente parpadeamos cuando cursorBlinkSpeed sea mayor a 0.
  private comenzarParpadeoDelCursor() {
    if (this.cursorBlinkSpeed > 0) {
      // Quiero que se vaya cambiando la variable mostrarCursor cada X tiempo... de forma regular (con una periodicidad)
      this.tareaDeParpadeoDelCursor = setInterval(() => this.mostrarCursor = !this.mostrarCursor, this.cursorBlinkSpeed);
    }
  }

  private finalizarParpadeoDelCursor() {
    if(this.hideCursorOnComplete){
      this.mostrarCursor = false;
      if (this.tareaDeParpadeoDelCursor) { // Siempre que hago un clearInterval, me aseguro de que el interval exista
        // En JS hay un tipo especial de if, en el que solo pongo la variable... no pongo condició.
        // En estos casos, lo  que JS comprueba es si la variable tiene asignado o no un valor (undefined o no)
        clearInterval(this.tareaDeParpadeoDelCursor); // Anular el temporizador... ya no se sigue ejecutando
      }
    }
  }

  // Podría ocurrir que los interval o los timeout, que se han configurado en el navegador,
  // sigan ejecutándose aunque el componente ya no esté en la página
  onDestroy() {
    this.anularTareasProgramadas();
  }

  anularTareasProgramadas() {
    if(this.tareaDeEsperaOPintado){
      clearTimeout(this.tareaDeEsperaOPintado);
      this.tareaDeEsperaOPintado = undefined;
    }
    if(this.tareaDeParpadeoDelCursor){
      clearInterval(this.tareaDeParpadeoDelCursor);
      this.tareaDeParpadeoDelCursor = undefined;
    }
  }

}

// Principios SOLID DE DESARROLLO DE SOFTWARE:
// S: Principio de responsabilidad única (Single Responsability Principle)
// Un componente (clase, función, módulo, paquete) solo debe tener UNA UNICA RESPONSABILIDAD y por ende una razón para cambiar
// D: Principio de inversión de dependencias