
# Vamos diseñando componentes

Dentro de un componente:
 Lógica de comportamiento (ts)
 Lógica de representación (html)

En ocasiones quiero poder acceder a los datos del html desde el ts (Ésta es más compleja):
 - Normalmente nos curre con campos de formularios:
     - [(ngmodel)] Genera una relación BIDIRECCIONAL entre el valor del campo del formulario y la variable del ts (A NIVEL DE UN COMPONENTE
     - Identificar un elemento del HTML con #ID... y usar ese ID a nivel del HTML para interactuar con el elemento...
       lo que pasa es que puedo pasar datos de ese elemento mediante llamadas a funciones del ts...
       Esto además sirve para poder ejecutar funciones en el HTML, entre elementos cruzados.
       Con el # lo que obtengo es una referencia al elemento HTML a nivel de HTML... pero puedo acceder a él desde el ts.
       Eso a priori. 
      - Porque si quiero puedo hacer otra cosa, que es crear uan variable en el ts y asociarla a ese elemento HTML que he identificado con #ID. Se hace mediante la anotación @ViewChild('ID') variable: ElementRef;
      - Para formularios más complejos... se puede usar el formBuilder
En ocasiones quiero poder acceder a los datos del ts desde el html (esto es fácil... uso la variable directamente)

En ocasiones lo que quiero hacer es otra cosa...
Que 2 componentes distintos puedan comunicarse entre si:

                  Angular                 HTML
    - PADRE --> HIJO (@Inputs)              atributos HTML
    - HIJO  --> PADRE (@Outputs)            eventos HTML
    - En muchas ocasiones quiero comunicar componentes que no guardan relación jerárquica...
      - Servicios y RxJS(Observables).. ESTO O HABITUAL: A MI (Iván) NO ME GUSTA NADA
        ServicioDeUsuarios
            iniciarEdicion(id)
            finalizarEdicion(id)
            subscrirmeAEdiciones()
        Cada persona(desaroolador) tiene libertad para poder escribir el código que le dé la real gana = DESMADRE!
        Cada uno implementa servicios a su rollo... sin u patrón.
      - REDUX: Una librería BRUTAL superutilizada (aunque sobre todo en el mundo REACT) para controlar el estado GLOBAL de una app.
        Es genial, fuerza unos patrones claros de diseño para estas cosas.   A MI ME ENCANTA 
  
  <ListadoDeUsuarios>
    <usuario id="1" editable="true">
    <usuario id="2" editable="true">
    <usuario id="3" editable="true">


    REVISORES:                              EDITORES
    Lucas   .....                           Antiñito    
    Felipe  .....                           Federico   
    Menchu  ..... [EDITAR] *

# CORS (CRoss Origin Resource Sharing)

Es una pseudo medida de protección que llevan los navegadores en colaboración con los servidores de Backend.

Tengo un frontal: https://miapp.com
Desde esa ruta lo carga mi navegador..

Ahora , el frontal quiere hacer una petición a Bend https://aps.miempresa.com

El navegador, pregunta al backend,su política de CORS... 
El backend le manda los orígenes desde los que estaría bien que se le hicieran peticiones...

El navegador mira si la ruta de la que descargamos el frontal: https://miapp.com está 
en la lista de orígenes permitidos del backend... Si no lo está, no hace la petición (la corta) y me da un error en consola JS de cors.


---

Formularios reactivos en Angular

Admiten validaciones... pero:
- Las puedo poner a nivel de campo o a nivel de formulario: Hay veces que no quiero validar un campo... sino una combinación de campos: Tal dato de un campo tiene que ser mayor que tal dato de otro campo.
- Cualquier validación puede realizarse de forma síncrona o asíncrona.
  Depende de lo que pueda tardar la validación.
  La diferencia en la definición está en que en lugar de dar [ null | ListaErrores ] una validacion ASÍNCRONA devuelve un Observable<null | ListaErrores>
  Si la validación puede tardar y bloquear la ejecución, mejor hacerla asíncrona.