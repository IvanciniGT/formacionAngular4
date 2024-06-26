import { Component } from '@angular/core';

// Estados:

const INICIO = 0;
const PRESENTACION = 1;
const EN_ESPERA_DE_NOMBRE = 2;
const NOMBRE_INVALIDO = 3;
const EN_ESPERA_DE_EMAIL = 4;
const EMAIL_INVALIDO = 5;
const EN_ESPERA_DE_FECHA_NACIMIENTO = 6;
const FECHA_DE_NACIMIENTO_INVALIDA = 7;
const EN_ESPERA_DE_CONFIRMACION = 8;
const EN_ESPERA_DE_RESPUESTA = 9;
const RESPUESTA_OK = 10;
const RESPUESTA_KO = 11;

// Transiciones:

const COMENZAR_PRESENTACION = 0;
const PEDIR_NOMBRE = 1;
const PEDIR_EMAIL = 2;
const PEDIR_FECHA_NACIMIENTO = 3;
const MARCAR_NOMBRE_COMO_INVALIDO = 4;
const MARCAR_EMAIL_COMO_INVALIDO = 5;
const MARCAR_FECHA_NACIMIENTO_COMO_INVALIDA = 6;
const SOLICITAR_CONFIRMACION = 7;
const ENVIAR_DATOS_AL_SERVIDOR = 8;
const RECIBIR_RESPUESTA_OK = 9;
const RECIBIR_RESPUESTA_KO = 10;
const VOLVER_A_COMENZAR = 11;

@Component({
  selector: 'signup',
  standalone: true,
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  nombre?:string;
  email?:string;
  fechaNacimiento?:string;
  motivoRechazo?:string;
  estado:number;

  constructor() {
    this.estado = INICIO;
  }

  private transicionar(transicion: number) {
    switch (transicion) {
      case COMENZAR_PRESENTACION:
        this.ejecutarTransicion(INICIO, PRESENTACION, () => this.comenzarPresentacion());
        break;
      case PEDIR_NOMBRE:
        this.ejecutarTransicion(PRESENTACION, EN_ESPERA_DE_NOMBRE, ()=>this.pedirNombre());
        break;
      case PEDIR_EMAIL:
        this.ejecutarTransicion([EN_ESPERA_DE_NOMBRE, NOMBRE_INVALIDO], EN_ESPERA_DE_EMAIL,()=>this.pedirEmail());
        break;
      case PEDIR_FECHA_NACIMIENTO:
        this.ejecutarTransicion([EN_ESPERA_DE_EMAIL, EMAIL_INVALIDO], EN_ESPERA_DE_FECHA_NACIMIENTO, ()=>this.pedirFechaNacimiento());
        break;
      case MARCAR_NOMBRE_COMO_INVALIDO:
        this.ejecutarTransicion(EN_ESPERA_DE_NOMBRE, NOMBRE_INVALIDO, ()=>this.marcarNombreComoInvalido());
        break;
      case MARCAR_EMAIL_COMO_INVALIDO:
        this.ejecutarTransicion(EN_ESPERA_DE_EMAIL, EMAIL_INVALIDO, ()=>this.marcarEmailComoInvalido());
        break;
      case MARCAR_FECHA_NACIMIENTO_COMO_INVALIDA:
        this.ejecutarTransicion(EN_ESPERA_DE_FECHA_NACIMIENTO, FECHA_DE_NACIMIENTO_INVALIDA, ()=>this.marcarFechaNacimientoComoInvalida());
        break;
      case SOLICITAR_CONFIRMACION:
        this.ejecutarTransicion([EN_ESPERA_DE_FECHA_NACIMIENTO, FECHA_DE_NACIMIENTO_INVALIDA], EN_ESPERA_DE_CONFIRMACION, ()=>this.solicitarConfirmacion());
        break;
      case ENVIAR_DATOS_AL_SERVIDOR:
        this.ejecutarTransicion(EN_ESPERA_DE_CONFIRMACION, EN_ESPERA_DE_RESPUESTA, ()=>this.enviarDatosAlServidor());
        break;
      case RECIBIR_RESPUESTA_OK:
        this.ejecutarTransicion(EN_ESPERA_DE_RESPUESTA, RESPUESTA_OK, ()=>this.recibirRespuestaOk());
        break;
      case RECIBIR_RESPUESTA_KO:
        this.ejecutarTransicion(EN_ESPERA_DE_RESPUESTA, RESPUESTA_KO, ()=>this.recibirRespuestaKo());
        break;
      case VOLVER_A_COMENZAR:
        this.ejecutarTransicion(RESPUESTA_OK, INICIO, ()=>this.volverAComenzar());
        break;
    }
  }

  private ejecutarTransicion(estadoEsperado: number | number[], estadoDestino: number, funcionAsociada: Function) {
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

  comenzarPresentacion() {}
  pedirNombre() {}
  pedirEmail() {}
  pedirFechaNacimiento() {}
  marcarNombreComoInvalido() {}
  marcarEmailComoInvalido() {}
  marcarFechaNacimientoComoInvalida() {}
  solicitarConfirmacion() {}
  enviarDatosAlServidor() {}
  recibirRespuestaOk() {}
  recibirRespuestaKo() {}
  volverAComenzar() {}
}
