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

@Component({
  selector: 'signup',
  standalone: true,
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

}
