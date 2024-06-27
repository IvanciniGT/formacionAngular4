# Queremos ver el detalle de un usuario

Verlo... y editarlo
Quiero poder usar esto en multiples proyectos.

# Datos:

- id: number
- nombre: string
- email: string
- fechaNacimiento: Date
- fechaDeAlta: Date
- telefono: string?

Algunos no serán editables:
    ID, fechaDeAlta


Al mostrar por defecto el componente se muestra en modo VISUALIZACION.
Si me dicen que es editable, saldrá un boton que diga "Editar" y me permita cambiar el modo a EDICION.
Aunque incluso podrían establecer el modo de visualización por defecto: VISUALIZACION o EDICION.
Cuando estoy en modo edicion: CANCELAR, GUARDAR.
El guardar me enviará los datos nuevos a un servicio
<usuario 
    id=""
    datos=""
    modo="VISUALIZACION"
    editable="true"
>

Me deben dar al crear el componente:
- id
- datos del usuario

Si me dan los datos, juego con ellos.
Si me dan el ID, llamaré al servicio para obtener los datos.... y ya jugar con ellos

---
# Inputs

- modo: "VISUALIZACION" | "EDICION"
- datos: Usuario | number
- editable: boolean

# Outputs (eventos?)

Por defecto, generar eventos en vuestros componentes asociados a cada transición de estado.
Algunos las podemos juntar.
Algunos podemos omitirlos porque aporten poco.... pero esto es limitarme... no tengo npi de cómo van a querer usar este componente luego. Que sea versatil... y los eventos le van a dar un huevo de versatilidad.

# Estados:

- INICIADO
- ESPERANDO_DATOS
- ERROR_EN_CARGA_DE_DATOS
- VISUALIZACION
- EDICION
- ESPERANDO_GUARDADO_DATOS
- ERROR_EN_GUARDADO_DE_DATOS

# TRANSICIONES

INICIADO -> ESPERANDO_DATOS
INICIADO -> VISUALIZACION
INICIADO -> EDICION

ESPERANDO_DATOS -> VISUALIZACION
ESPERANDO_DATOS -> EDICION
ESPERANDO_DATOS -> ERROR_EN_CARGA_DE_DATOS

VISUALIZACION -> EDICION
EDICION -> VISUALIZACION

ERROR_EN_CARGA_DE_DATOS -> ERROR_EN_CARGA_DE_DATOS (retry)
ERROR_EN_CARGA_DE_DATOS -> VISUALIZACION
ERROR_EN_CARGA_DE_DATOS -> EDICION

EDICION -> ESPERANDO_GUARDADO_DATOS

ESPERANDO_GUARDADO_DATOS -> VISUALIZACION
ESPERANDO_GUARDADO_DATOS -> ERROR_EN_GUARDADO_DE_DATOS

ERROR_EN_GUARDADO_DE_DATOS -> ERROR_EN_GUARDADO_DE_DATOS (retry)
ERROR_EN_GUARDADO_DE_DATOS -> VISUALIZACION
