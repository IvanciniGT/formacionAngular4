
                    FRONTAL                                                     BACKEND
                    ------------------------------------------------  ----------------------------------------------------------------
                    Componente -> Servicio                ->          ControladorRest -> Servicio -> Repositorio -> BBDD
                        ^                                                   ^                           ^
RESPONSABILIDAD     formulario Captura de datos                       Expone un servicio             Lógica de persistencia
                                      ^                                      ^              ^
                                  Comunicaciones con Bend                               Lógica de negocio

FLUJO DE DATOS
Quiero poner BARRERAS DE CONTENCIÓN ante cambios en las comunicaciones
                               DTO3        <->           DTO2        <->             DTO          <->  ENTITY

Cuál es la diferencia entre un DTO y un Entity?
- La diferencia está en cómo se implementa el método .equals()
  - ENTITY: Se implementa con el ID
  - DTO: Se implementa con los atributos
Tanto Entity como DTO son objetos simples de transferencia de datos.
Su implementación va a ser muy simple, con atributos y métodos getter y setter.

```ts
class PersonaDTO3 {
    id: number;
    nombre: string;
    apellido: string;
    edad: number;

    constructor(nombre: string, apellido: string, edad: number) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
}

class PersonaDTO2 {
    id: number;
    nombre: string;
    apellido: string;
    edad: number;

    constructor(nombre: string, apellido: string, edad: number) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
}

class PersonaDTO {
    id: number;
    nombre: string;
    apellido: string;
    edad: number;

    constructor(nombre: string, apellido: string, edad: number) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
}

class PersonaEntity {
    id: number;
    name: string;
    apellido: string;
    edad: number;

    constructor(nombre: string, apellido: string, edad: number) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
}
```