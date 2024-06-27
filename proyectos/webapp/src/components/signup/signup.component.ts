import { Component } from '@angular/core';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { DatosNuevoUsuario } from '../../models/usuarios/datos.nuevo.usuario.model';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TypewritterComponent } from '../typewritter/typewritter.component';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, TypewritterComponent, FormsModule], // Me permite usar un monto de directivas que tiene angular... como ngIf, ngFor, etc.
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  // Estados:

  readonly INICIO = 0;
  readonly PRESENTACION = 1;
  readonly EN_ESPERA_DE_NOMBRE = 2;
  readonly NOMBRE_INVALIDO = 3;
  readonly EN_ESPERA_DE_EMAIL = 4;
  readonly EMAIL_INVALIDO = 5;
  readonly EN_ESPERA_DE_FECHA_NACIMIENTO = 6;
  readonly FECHA_DE_NACIMIENTO_INVALIDA = 7;
  readonly EN_ESPERA_DE_CONFIRMACION = 8;
  readonly EN_ESPERA_DE_RESPUESTA = 9;
  readonly RESPUESTA_OK = 10;
  readonly RESPUESTA_KO = 11;

  nombre?:string;
  email?:string;
  fechaNacimiento?:string;
  motivoRechazo?:string;
  estado:number;
  subscripcion: Subscription | undefined;
  //private usuariosService: UsuariosService;

  constructor(private usuariosService: UsuariosService) { // Inyeccion de depencias. 
                                                  // Que cuando Angular cree una instancia de este componente
                                                  // Me entregue una instancia de UsuariosService... Con la implementación que sea... me la pela !
    this.estado = this.INICIO;
    //this.usuariosService = usuariosService;
  }

  ngOnInit() {
    this.transicionar(COMENZAR_PRESENTACION);
  }
  
  ngOnDestroy() {
    this.subscripcion?.unsubscribe(); // Caso que el usuario salga prematuramente de la página mientras se está enviando la petición al servidor
  }

  private transicionar(transicion: number) {
    switch (transicion) {
      case COMENZAR_PRESENTACION:
        this.ejecutarTransicion(this.INICIO, this.PRESENTACION);
        break;
      case PEDIR_NOMBRE:
        this.ejecutarTransicion(this.PRESENTACION, this.EN_ESPERA_DE_NOMBRE);
        break;
      case PEDIR_EMAIL:
        this.ejecutarTransicion([this.EN_ESPERA_DE_NOMBRE, this.NOMBRE_INVALIDO], this.EN_ESPERA_DE_EMAIL);
        break;
      case PEDIR_FECHA_NACIMIENTO:
        this.ejecutarTransicion([this.EN_ESPERA_DE_EMAIL, this.EMAIL_INVALIDO], this.EN_ESPERA_DE_FECHA_NACIMIENTO);
        break;
      case MARCAR_NOMBRE_COMO_INVALIDO:
        this.ejecutarTransicion(this.EN_ESPERA_DE_NOMBRE, this.NOMBRE_INVALIDO);
        break;
      case MARCAR_EMAIL_COMO_INVALIDO:
        this.ejecutarTransicion(this.EN_ESPERA_DE_EMAIL, this.EMAIL_INVALIDO);
        break;
      case MARCAR_FECHA_NACIMIENTO_COMO_INVALIDA:
        this.ejecutarTransicion(this.EN_ESPERA_DE_FECHA_NACIMIENTO, this.FECHA_DE_NACIMIENTO_INVALIDA);
        break;
      case SOLICITAR_CONFIRMACION:
        this.ejecutarTransicion([this.EN_ESPERA_DE_FECHA_NACIMIENTO, this.FECHA_DE_NACIMIENTO_INVALIDA], this.EN_ESPERA_DE_CONFIRMACION);
        break;
      case ENVIAR_DATOS_AL_SERVIDOR:
        this.ejecutarTransicion(this.EN_ESPERA_DE_CONFIRMACION, this.EN_ESPERA_DE_RESPUESTA, ()=>this.enviarDatosAlServidor());
        break;
      case RECIBIR_RESPUESTA_OK:
        this.ejecutarTransicion(this.EN_ESPERA_DE_RESPUESTA, this.RESPUESTA_OK);
        break;
      case RECIBIR_RESPUESTA_KO:
        this.ejecutarTransicion(this.EN_ESPERA_DE_RESPUESTA, this.RESPUESTA_KO);
        break;
      case VOLVER_A_COMENZAR:
        this.ejecutarTransicion(this.EN_ESPERA_DE_CONFIRMACION, this.EN_ESPERA_DE_NOMBRE);
        break;
    }
  }

  private ejecutarTransicion(estadoEsperado: number | number[], estadoDestino: number, funcionAsociada?: Function) {
    if (Array.isArray(estadoEsperado)) {
      if (!estadoEsperado.includes(this.estado)) {
        throw new Error("No se puede transicionar de " + this.estado + " a " + estadoDestino);
      }
    }
    else if (this.estado !== estadoEsperado) {
      throw new Error("No se puede transicionar de " + this.estado + " a " + estadoDestino);
    }
    this.estado = estadoDestino;
    if(funcionAsociada!== undefined)
        funcionAsociada();
  }

  enviarDatosAlServidor() {
    const datos = {
                    "nombre": this.nombre, 
                    "email": this.email, 
                    "fechaNacimiento": this.fechaNacimiento 
                  } as DatosNuevoUsuario;
    // En typescript usamos el concepto de Duck Typing... También JS
    // Duck typing: Si parece un pato, nada como un pato y grazna como un pato... Entonces es un pato.
  /*
    const datos2 = new DatosNuevoUsuario();
    datos2.nombre = this.nombre!;
    datos2.email = this.email!;
    datos2.fechaNacimiento = this.fechaNacimiento!;
  */
    this.subscripcion=this.usuariosService.solicitarRegistro(datos).subscribe( // Esta función se ejecuta de forma asíncrona (más o menos)
      { // Esto queda programado para hacerse en el futuro.. es el equivalente a los then y catch de las promesas
        next: () => this.transicionar(RECIBIR_RESPUESTA_OK),
        error: (mensaje) => {
          this.motivoRechazo = mensaje;
          this.transicionar(RECIBIR_RESPUESTA_KO)
        }
      }
    );
  }

  validarElNombre(){
    if(this.nombre?.match(/^[a-zA-Z0-9]{4,20}$/)){
      this.transicionar(PEDIR_EMAIL);
    } else {
      this.transicionar(MARCAR_NOMBRE_COMO_INVALIDO);
    }
  }

  validarElEmail(){
    if(this.email?.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)){
      this.transicionar(PEDIR_FECHA_NACIMIENTO);
    }else{
      this.transicionar(MARCAR_EMAIL_COMO_INVALIDO);
    }
  }

  validarLaFechaDeNacimiento(){
    if(this.fechaNacimiento?.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)){
      this.transicionar(SOLICITAR_CONFIRMACION);
    }else{
      this.transicionar(MARCAR_FECHA_NACIMIENTO_COMO_INVALIDA);
    }
  }

  confirmacionOK(){
    this.transicionar(ENVIAR_DATOS_AL_SERVIDOR);
  }

  confirmacionKO(){
    this.transicionar(VOLVER_A_COMENZAR);
  }

  presentacionFinalizada(){
    this.transicionar(PEDIR_NOMBRE);
  }
}
