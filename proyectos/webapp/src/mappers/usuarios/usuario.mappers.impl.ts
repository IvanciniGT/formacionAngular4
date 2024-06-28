import { Injectable } from "@angular/core";
import { UsuarioBackend } from "../../models/backend/usuarios/usuario.model";
import { Usuario } from "../../models/usuarios/usuario.model";
import { UsuarioMappers } from "./usuario.mappers";

@Injectable({
    providedIn: 'root',
})
export class UsuarioMappersImpl extends UsuarioMappers {
    override usuario2UsuarioBackend(usuario: Usuario): UsuarioBackend {
        return {
             id: usuario.id,
             email: usuario.email,
             fechaAlta: usuario.fechaAlta,
             fechaNacimiento: usuario.fechaNacimiento,
             name: usuario.nombre 
            };
    }
    override usuarioBackend2Usuario(usuarioBackend: UsuarioBackend): Usuario {
        return {
            id: usuarioBackend.id,
            email: usuarioBackend.email,
            fechaAlta: usuarioBackend.fechaAlta,
            fechaNacimiento: usuarioBackend.fechaNacimiento,
            nombre: usuarioBackend.name };
    }
}