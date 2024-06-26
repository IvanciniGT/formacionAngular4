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

  constructor(private usuariosService: UsuariosService) { // Inyeccion de depencias
    this.estado = INICIO;
  }

  ngOnInit() {
    this.transicionar(COMENZAR_PRESENTACION);
  }

  private transicionar(transicion: number) {
    switch (transicion) {
      case COMENZAR_PRESENTACION:
        this.ejecutarTransicion(INICIO, PRESENTACION);
        break;
      case PEDIR_NOMBRE:
        this.ejecutarTransicion(PRESENTACION, EN_ESPERA_DE_NOMBRE);
        break;
      case PEDIR_EMAIL:
        this.ejecutarTransicion([EN_ESPERA_DE_NOMBRE, NOMBRE_INVALIDO], EN_ESPERA_DE_EMAIL);
        break;
      case PEDIR_FECHA_NACIMIENTO:
        this.ejecutarTransicion([EN_ESPERA_DE_EMAIL, EMAIL_INVALIDO], EN_ESPERA_DE_FECHA_NACIMIENTO);
        break;
      case MARCAR_NOMBRE_COMO_INVALIDO:
        this.ejecutarTransicion(EN_ESPERA_DE_NOMBRE, NOMBRE_INVALIDO);
        break;
      case MARCAR_EMAIL_COMO_INVALIDO:
        this.ejecutarTransicion(EN_ESPERA_DE_EMAIL, EMAIL_INVALIDO);
        break;
      case MARCAR_FECHA_NACIMIENTO_COMO_INVALIDA:
        this.ejecutarTransicion(EN_ESPERA_DE_FECHA_NACIMIENTO, FECHA_DE_NACIMIENTO_INVALIDA);
        break;
      case SOLICITAR_CONFIRMACION:
        this.ejecutarTransicion([EN_ESPERA_DE_FECHA_NACIMIENTO, FECHA_DE_NACIMIENTO_INVALIDA], EN_ESPERA_DE_CONFIRMACION);
        break;
      case ENVIAR_DATOS_AL_SERVIDOR:
        this.ejecutarTransicion(EN_ESPERA_DE_CONFIRMACION, EN_ESPERA_DE_RESPUESTA, ()=>this.enviarDatosAlServidor());
        break;
      case RECIBIR_RESPUESTA_OK:
        this.ejecutarTransicion(EN_ESPERA_DE_RESPUESTA, RESPUESTA_OK);
        break;
      case RECIBIR_RESPUESTA_KO:
        this.ejecutarTransicion(EN_ESPERA_DE_RESPUESTA, RESPUESTA_KO);
        break;
      case VOLVER_A_COMENZAR:
        this.ejecutarTransicion(EN_ESPERA_DE_CONFIRMACION, EN_ESPERA_DE_NOMBRE);
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
    // TODO... enviar datos al servidor
    //const url = "http://localhost/8080/signup"
    // Hago un post de los datos
    // JSON??? JavaScript Object Notation
    const datos = {
                    "nombre": this.nombre, 
                    "email": this.email, 
                    "fechaNacimiento": this.fechaNacimiento 
                  };
    this.usuariosService.solicitarRegistro(datos);
    // HAGO AQUI EL POST. En JS tenemos una funcion para hacer post. Angular me da otra... ya os la enseñaré.
    // ESTO ES UNA MIERDA INTEGRAL !!!!!!!!
    // EN LA PUÑETERA VIDA , NUNCA 
    // ESTOY CREANDO EL QUE? QUE ES ESTA CLASE? Un componente Web.
    // SOLID: Single Responsability Principle
    // Y cuál es la responsabilidad de un componente WEB? Definir una marquita, su estilo y su comportamiento.
    // En nuestro caso concreto, cual es la responsabilidad de este componente? CAPTURAR los datos de un nuevo usuario, solicitar un registro e informarle de si ha podido registrarse o no.
    // A quién le solicito el registro? Al servidor? Ni de coña. A UN SERVICIO QUE MONTAREMOS EN FRONTAL
    // Cuya responsabilidad será comunicarse con el servidor.
    //fetch(url, {method: 'POST', body: JSON.stringify(datos)})
    // Y el servidor contestará con un OK o un KO
    // Si contesta con un OK:
    this.transicionar(RECIBIR_RESPUESTA_OK);
    // Si contesta con un KO:
    this.transicionar(RECIBIR_RESPUESTA_KO);
    // Rellenar: motivoRechazo
  }

  validarElNombre(nombre:string){
    this.nombre = nombre;
    if(this.nombre?.match(/^[a-zA-Z0-9]{4,20}+$/)){
      this.transicionar(PEDIR_EMAIL);
    } else {
      this.transicionar(MARCAR_NOMBRE_COMO_INVALIDO);
    }
  }

  validarElEmail(email:string){
    this.email = email;
    if(this.email?.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)){
      this.transicionar(PEDIR_FECHA_NACIMIENTO);
    }else{
      this.transicionar(MARCAR_EMAIL_COMO_INVALIDO);
    }
  }

  validarLaFechaDeNacimiento(fechaNacimiento:string){
    this.fechaNacimiento = fechaNacimiento;
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
