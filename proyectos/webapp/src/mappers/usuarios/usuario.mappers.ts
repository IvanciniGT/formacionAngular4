import { UsuarioBackend } from "../../models/backend/usuarios/usuario.model";
import { Usuario } from "../../models/usuarios/usuario.model";

export abstract class UsuarioMappers {
    abstract usuario2UsuarioBackend(usuario: Usuario): UsuarioBackend; 
    abstract usuarioBackend2Usuario(usuarioBackend: UsuarioBackend) : Usuario;
}