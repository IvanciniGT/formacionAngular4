import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../../models/usuarios/usuario.model';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { Subscription } from 'rxjs';

// Transiciones
const INICIAR_CARGA_DATOS = 0; // INICIADO -> ESPERANDO_DATOS
const VISUALIZAR = 1; // ESPERANDO_DATOS -> VISUALIZACION | INICIADO -> VISUALIZACION | EDICION -> VISUALIZACION | ERROR_EN_CARGA_DE_DATOS -> VISUALIZACION | ERROR_EN_GUARDADO_DE_DATOS -> VISUALIZACION | ESPERANDO_GUARDADO_DATOS -> VISUALIZACION
const EDITAR = 2;     // ESPERANDO_DATOS -> EDICION | INICIADO -> EDICION | VISUALIZACION -> EDICION | ERROR_EN_CARGA_DE_DATOS -> EDICION
const REINTENTAR_CARGA_DATOS = 3; // ERROR_EN_CARGA_DE_DATOS -> ERROR_EN_CARGA_DE_DATOS (retry)
const MARCAR_ERROR_EN_CARGA_DE_DATOS = 4; // ESPERANDO_DATOS -> ERROR_EN_CARGA_DE_DATOS
const GUARDAR_DATOS = 5; // EDICION -> ESPERANDO_GUARDADO_DATOS
const REINTENTAR_GUARDADO_DATOS = 6; // ERROR_EN_GUARDADO_DE_DATOS -> ERROR_EN_GUARDADO_DE_DATOS (retry)
const MARCAR_ERROR_EN_GUARDADO_DE_DATOS = 7; // ESPERANDO_GUARDADO_DATOS -> ERROR_EN_GUARDADO_DE_DATOS

@Component({
  selector: 'usuario',
  standalone: true,
  imports: [],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

  // Estados
  readonly INICIADO = 0;
  readonly ESPERANDO_DATOS = 1;
  readonly ERROR_EN_CARGA_DE_DATOS = 2;
  readonly VISUALIZACION = 3;
  readonly EDICION = 4;
  readonly ESPERANDO_GUARDADO_DATOS = 5;
  readonly ERROR_EN_GUARDADO_DE_DATOS = 6;
  
  // Outputs
  @Output() usuarioCargado: EventEmitter<void> = new EventEmitter<void>();
  @Output() usuarioGuardado: EventEmitter<void> = new EventEmitter<void>();
  @Output() errorCarga: EventEmitter<any> = new EventEmitter<any>();
  @Output() errorGuardado: EventEmitter<any> = new EventEmitter<any>();
  @Output() edicionIniciada: EventEmitter<void> = new EventEmitter<void>();
  @Output() edicionCancelada: EventEmitter<void> = new EventEmitter<void>();

  // Inputs
  @Input() datos!: Usuario | number;
  @Input() modoPorDefecto: "VISUALIZACION" | "EDICION" = "VISUALIZACION";
  @Input() editable: boolean = false;

  // Propiedades
  estado: number;
  motivoError?: string;
  usuario?: Usuario;    // Con este trabajo... Lo relleno desde el input datos (si me pasan un Usuario) o desde el servicio (si me pasan un número)
  subscricion: Subscription | undefined;

  constructor(private usuariosService: UsuariosService) {
    this.estado = this.INICIADO;
  }

  ngOnInit() {
    if (this.datos instanceof Usuario) { // Miro si me han mandado los datos (o un id numérico)
      this.usuario = this.datos;
      this.transicionar(this.modoPorDefecto=="VISUALIZACION" ? VISUALIZAR: EDITAR);
    }else{ // Pues no.. lo que me han pasado es un numero.
      this.transicionar(INICIAR_CARGA_DATOS);
    }
  }

  ngOnDestoy() {
    this.subscricion?.unsubscribe();
  }

  private transicionar(transicion: number) {
    switch (transicion) {
      case VISUALIZAR:
        this.ejecutarTransicion([
          this.ESPERANDO_DATOS,
          this.INICIADO,
          this.EDICION,
          this.ERROR_EN_CARGA_DE_DATOS,
          this.ERROR_EN_GUARDADO_DE_DATOS,
          this.ESPERANDO_GUARDADO_DATOS
        ], this.VISUALIZACION, () => this.visualizar());
        break;
      case INICIAR_CARGA_DATOS:
        this.ejecutarTransicion(this.INICIADO, this.ESPERANDO_DATOS, () => this.cargarUsuario());
        break;
      case EDITAR:
        this.ejecutarTransicion([
          this.ESPERANDO_DATOS,
          this.INICIADO,
          this.VISUALIZACION,
          this.ERROR_EN_CARGA_DE_DATOS
        ], this.EDICION);
        break;
      case REINTENTAR_CARGA_DATOS:
        this.ejecutarTransicion(this.ERROR_EN_CARGA_DE_DATOS, this.ERROR_EN_CARGA_DE_DATOS, () => this.cargarUsuario());
        break;
      case MARCAR_ERROR_EN_CARGA_DE_DATOS:
        this.ejecutarTransicion(this.ESPERANDO_DATOS, this.ERROR_EN_CARGA_DE_DATOS);
        break;
      case GUARDAR_DATOS:
        this.ejecutarTransicion(this.EDICION, this.ESPERANDO_GUARDADO_DATOS, () => this.guardarUsuario());
        break;
      case REINTENTAR_GUARDADO_DATOS:
        this.ejecutarTransicion(this.ERROR_EN_GUARDADO_DE_DATOS, this.ERROR_EN_GUARDADO_DE_DATOS);
        break;
      case MARCAR_ERROR_EN_GUARDADO_DE_DATOS:
        this.ejecutarTransicion(this.ESPERANDO_GUARDADO_DATOS, this.ERROR_EN_GUARDADO_DE_DATOS);
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

  visualizar() {
    throw new Error('Method not implemented.');
  }
  cargarUsuario() {
    // Pedir los datos al servicio
    this.subscricion = this.usuariosService.getUsuario(this.datos as number).subscribe(
      {
        next: (usuario: Usuario) => {
          this.usuario = usuario;
          this.usuarioCargado.emit();
          this.transicionar(this.modoPorDefecto=="VISUALIZACION" ? VISUALIZAR: EDITAR);
        },
        error: (error: any) => {
          this.motivoError = error;
          this.errorCarga.emit(error);
          this.transicionar(MARCAR_ERROR_EN_CARGA_DE_DATOS);
        }
      });
  }
  guardarUsuario() {
    // Pedir los datos al servicio
    this.subscricion = this.usuariosService.saveUsuario(this.usuario).subscribe(
      {
        next: (usuario: Usuario) => {
          this.usuario = usuario;
          this.usuarioGuardado.emit();
          this.transicionar(VISUALIZAR);
        },
        error: (error: any) => {
          this.motivoError = error;
          this.errorGuardado.emit(error);
          this.transicionar(MARCAR_ERROR_EN_GUARDADO_DE_DATOS);
        }
      });
  }

  comenzarEdicion(){ // Cuando aprietan el botón de editar
    this.transicionar(EDITAR);
    this.edicionIniciada.emit();
  }
  cancelarEdicion(){ // Cuando aprietan el botón de cancelar
    this.transicionar(VISUALIZAR);
    this.edicionCancelada.emit();
  }
  guardar(){ // Cuando aprietan el botón de guardar
    this.transicionar(GUARDAR_DATOS);
  }
  solicitarReinitentarCarga(){ // Cuando aprietan el botón de reintentar
    this.transicionar(REINTENTAR_CARGA_DATOS);
  }
  solicitarGuardado(){ // Cuando aprietan el botón de reintentar
    this.transicionar(REINTENTAR_GUARDADO_DATOS);
  }
}
