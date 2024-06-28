
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