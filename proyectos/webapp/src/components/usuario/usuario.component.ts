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
  @Output() usuarioCargado: EventEmitter<Usuario> = new EventEmitter<Usuario>();
  @Output() usuarioGuardado: EventEmitter<number> = new EventEmitter<number>();
  @Output() errorCarga: EventEmitter<number> = new EventEmitter<number>();
  @Output() errorGuardado: EventEmitter<number> = new EventEmitter<number>();
  @Output() edicionIniciada: EventEmitter<number> = new EventEmitter<number>();
  @Output() edicionCancelada: EventEmitter<number> = new EventEmitter<number>();

  // Inputs
  @Input() datos!: Usuario | number;
  @Input() modo: "VISUALIZACION" | "EDICION" = "VISUALIZACION";
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
}
