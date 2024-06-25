
# Framework?

- Un conjunto de librerías
- Un patrón/forma de trabajo (de usar esas librerías)
- Entorno/Herramientas de desarrollo

# Qué es Angular?

Es un framework para desarrollo de aplicaciones en TS. Principalmente se usa para apps WEB... Aun que no en exclusiva.

---

# Qué es TypeScript?

Es un lenguaje:
- Tipado estático / tipado fuerte vs tipado dinámico
    Cualquier lenguaje de programación me permite trabajar con datos. Y esos datos tienen una naturaleza (tipo): Números, Textos, Listas, Fechas...

    ```java
        String texto = "hola";
    ```
    Esta linea hace 3 cosas:    [String texto = "hola"]
        1. "hola"           Crea un objeto de tipo texto(String) en RAM... con valor "hola"
        2. String texto     Crea una variable de tipo texto(String)... Una variable que puede asociarse a objetos de tipo String
        3. =                Asigna la variable texto al valor "hola"
                            La variable es una referencia a un dato que tengo en RAM.
    ```java
        texto = "adios";
    ```
        1. "adios"          Crea un objeto de tipo texto(String) en RAM... con valor "adios"
                             Dónde? en el mismo sitio donde estaba "hola" o en otro? EN OTRO 
                             En este momento tenemos en RAM 2 cosas: "hola" "adios"
        2. texto =          Despegar el postit de donde estaba pegao y moverlo a una nueva ubicación
                            El dato "hola" queda huérfano de variable.. Ninguna variable le apunta.
                            Y en Java, JS,TS, PYTHON, el dato es irrecuperable. Se convierte en BASURA = GARBAJE.... y potencialmente será eliminado de RAM 8en algún momento... o no).
                            De eso se encargará el recolector de basura (GC)

    - Tipado estático: TS, JAVA, C#
      Las variables también tienen tipo... y por ende solo puede apuntar a datos de ese tipo (o subtipos)
    - Tipado dinámico: JS, PYTHON
      Las variables no tienen tipo ... y pueden apuntar a datos de cualquier tipo.
      Es sencillo, cómodo en proyectos pequeños.
      Inutilizable en proyectos grandes:
        generarInforme(titulo, datos). Esto es totalmente AMBIGUO. No se sabe que tipo de datos se espera como argumentos. No tengo npi de qué devolverá la función.
- Interpretado vs compilado
    Al final mi programa es ejecutado por un SO. Y mi SO no entiende ni de C, JAVA, ni JS, ni menos TS.
    Mi programa hay que traducirlo al lenguaje del SO/arquitectura de microprocesador.

        - Compilación: Pre-traducción estática del código: C, C++, C#
        - Interpretación: Traducción dinámica del código: PYTHON, BASH, JS

        JAVA.. es rarito.. es especial: COMPILADO + INTERPRETADO
            .java -> compila -> .class (bytecode) -> JVM (Interpreta el bytecode)
        TS... también es rarito... especial: TRANSPILADO + INTERPRETADO
            .ts -> transpila -> .js -> interpreta -> Intérprete de JS

        Transpilación es traducir un lenguaje a otro lenguaje de nivel similar.
        Compilación es traducir un lenguaje a otro de nivel inferior (más bajo nivel... instrucciones más duras.).
- Paradigmas de programación. Formas de usar un lenguaje para expresar un concepto.
    - Imperativo:           Cuando damos instrucciones que deben ejecutarse en un orden determinado.
                            En ocasiones me interesa romper la secuencialidad (orden): if, for, while, switch.
    - Procedural:           Cuando el lenguaje me permite agrupar código en procedimientos/funciones/métodos/rutinas/subrutinas... y posteriormente invocarlos.
                            Tradicionalmente hemos creado funciones para:
                            - Dar mejor estructura al código
                            - Reutilizar código
    - Funcional             Cuando el lenguaje me permite que una variable apunte a una función...
                             y posteriormente invocar(ejecutar) la función desde la variable.
                             El tema no es lo que es la programación funcional... Es lo que me permite hacer.
                             Desde el momento que puedo hacer que una variable apunte a una función... puedo hacer cosas muy locas:
                             - Crear funciones que acepten funciones como argumentos
                             - Crear funciones que devuelvan funciones como resultado
                            En ocasiones creo funciones porque otras funciones necesitan funcione como argumento...
                            Y no quiero reutilizar la función que necesito como argumento.
                            Y no me genera un código mejor estructurado el declararla de forma independiente. 
    - Orientado a objetos   Cuando el lenguaje me permite definir mis propios TIPOS de datos.
                            Todo lenguaje viene con unos tipos preestablecidos:
                                            Se caracterizan por         Tienen funciones asociados
                                String      secuencia caracteres         .length(), .toUpperCase()...
                                Date        dia / mes / año              .caesEnFinDeSemana()...
                                List        secuencia de datos           .length(), .sort(), get(i)...
                                ---
                                Usuario     nombre, apellidos, edad      .esTuCumpleaños()
    - Declarativo           No doy órdenes. Simplemente expongo las cosas que tengo/o quiero a mi disposición.
                            Dar órdenes es un problemón. ODIAMOS LOS LENGUAJES IMPERATIVOS... Y DESGRACIADAMENTE ESTAMOS MUY ACOSTUMBRADOS A ELLOS 

    Felipe, pon una silla debajo de la ventana.    IMPERATIVO: ME Centro en lo que Felipe tiene que
                                                               hacer. No en mi objetivo final.

        Felipe (IF) hay algo que no sea una silla debajo de la ventana, 
            Quita eso
        Felipe, SI (IF) no hay ya una silla debajo de la ventana, 
            IF no hay sillas, vete al IKEA a por una silla.
            PON una silla debajo de la ventana.

    Felipe, debajo de la ventana tiene que haber una silla.    DECLARATIVO: Me centro en lo que quiero conseguir... no en cómo conseguirlo. Delego esa responsabilidad en Felipe (mi computadora).
    ADORAMOS EL LENGUAJE IMPERATIVO. De hecho todas las herramientas / Frameworks que hacen uso de lenguaje DECLARATIVO son las que hoy en día triunfan:
    - Angular
    - Spring
    - Docker compose
    - Kubernetes
    - Ansible
    Al principio nos vuelven locos los lenguajes declarativos... porque no estamos acostumbrados a delegar... y queremos controlar, que es a lo que estamos acostumbrados (IMPERATIVOS)

        ```java/Spring
        @Service    Quiero un servicio
        ```

Spring, en JAVA es un contenedor de inversión de control.
Angular, en TS es un contenedor de inversión de control.

# Contenedor de inversión de control

Básicamente es un programa que se encarga de controlar el FLUJO DE MI APLICACION. Ya no lo controlo yo... Se lo delego al contenedor de inversión de control.
Esto es clave... entre otras cosas... me ayuda enormemente a utilizar un patrón de inyección de dependencias.

# Patrón de inyección de dependencias???

Si... es un patrón de diseño en orientación a objetos por el cuál mis clases no crean instancias de los objetos que necesitan... sino que le son suministrados por un tercero (en nuestro caso el contenedor de inversión de control).

# Y esto para qué?

Fundamental... para poder respetar el principio de inversión de dependencias.

## Principio de inversión de dependencias

Uno de los grandes 5 principios de desarrollo SOLID.
Que me dice que un componente de alto nivel de mi sistema no debería depender de implementaciones de un componente de bajo nivel... sino que ambos deberían depender de una abstracción (interfaces).
Los principios son formas de trabajar sugeridas... que puedo respetar o no!

Esto no es una tontería... es básicamente la UNICA forma de trabajar que realmente me va a permitir hacer pruebas UNITARIAS y de INTEGRACIÓN de mi código.

---

Quiero una aplicación que me permita por consola (frontal) mirar si una palabra existe o no en un diccionario... y que me entregue sus definiciones caso que exista.
PROYECTOS GIT independientes? 3

## Frontal: Consola.
```java
import com.diccionario.SuministradorDeDiccionarios;
import com.diccionario.Diccionario;
//import com.diccionario.ficheros.SuministradorDeDiccionariosEnFichero; // Y AQUI MURIO EL PROYECTO !!!
   // AQUI LA HEMOS REGADO...
   // Con esta linea NOS ACABAMOS DE CAGAR en el ppo. de inversión de dependencias
public class App {
    public static void main(String[] args) {
        ...
    }
    public void procesarPeticion(String palabra, String idioma, SuministradorDeDiccionarios miSuministrador){
        //SuministradorDeDiccionarios miSuministrador = new SuministradorDeDiccionariosEnFicheros();
        if(miSuministrador.tienesDiccionarioDe(idioma)){
            Diccionario miDiccionario = miSuministrador.getDiccionario(idioma);
            if(miDiccionario.existe(palabra)){
                List<String> definiciones = miDiccionario.definiciones(palabra);
                for(String definicion : definiciones){
                    System.out.println(definicion);
                }
            } else {
                System.out.println("La palabra no existe en el diccionario");
            }
        } else {
            System.out.println("No tengo diccionario de ese idioma");
        }
    }
}
```

Voy a configurar un contenedor de inversión de control para que seá el quién se encargue de mirar QUÉ SUMINISTRADOR hay disponible y entregármelo (entregarme una instancia de la interfaz SuministradorDeDiccionarios, usando el suministrador que tenga disponible: En nuestro caso: SuministradorDeDiccionariosEnFichero).

## API DE comunicación.

```java
package com.diccionario;
interface Diccionario {
    boolean existe(String palabra);
    List<String> definiciones(String palabra);
}
interface SuministradorDeDiccionarios {
    boolean tienesDiccionarioDe(String idioma);
    Diccionario getDiccionario(String idioma);
}
```

## Backend: Interactuar con el diccionario
### Backend que lee los diccionarios de Ficheros
```java
package com.diccionario.ficheros;
import com.diccionario.Diccionario;
import com.diccionario.SuministradorDeDiccionarios;
class DiccionarioEnFichero implements Diccionario {
    public boolean existe(String palabra) {
        // CODIGO GUAY
    }
    public List<String> definiciones(String palabra) {
        // CODIGO GUAY
    }

}
class SuministradorDeDiccionariosEnFichero implements SuministradorDeDiccionarios {
    public boolean tienesDiccionarioDe(String idioma) {
        // CODIGO GUAY
    }
    public Diccionario getDiccionario(String idioma) {
        // CODIGO GUAY
    }
}
```
### Backend que lee los diccionarios de una BBDD


CONSOLA > API < FICHEROS
 

---


JS ha evolucionado un huevo... por muchos frentes paralelos entre si:
- Como lenguaje ya ni siquiera se llama JS: mocha(netscape) -> js -> es (ECMASCRIPT)
  La ECMA (European Computer Manufacturers Association) es la que se encarga de estandarizar el lenguaje.
  Generan un estándar... con muchas versiones que llevan ya: ES6, ES7, ES2022
- Con su intérprete. La gente de Google arrancó el motor de procesamiento de JS (Interprete) de Chromium (base de Chrome, Edge, Safari, Opera) y lo convirtió en un proyecto independiente. Lo que hoy en día conocemos como NODE
  Desde ese momento es posible ejecutar programas JS fuera del navegador.
  El node es a JS algo así como la JVM a JAVA

---


# Desarrollo FrontEnd

Es muy diferente del mundo Backend.
En el frontal, trabajamos de continuo con procesos asíncronos... necesitamos interactividad.
- En funciones asíncronas, una estrategia que uso mucho es la entrega de funciones de Callback.

pedirDatosAlServidor(182873672, notificarFinalizacion);

---

# Pruebas de software

Esto es importante? SIN DISCUSIÓN. Es fundamental.

Nos gusta hacer pruebas? Los desarrolladores somos unos hipócritas de cojones.
Qué hacemos más de la mitad de nuestro tiempo? Pruebas... pero... nosotros no lo llamamos pruebas...
Lo llamamos desarrollo.

## Vocabulario en el mundo del testing:

- Error     Los humanos cometen errores(por estar cansados, por falta de conocimiento, concentración...)
            Las máquinas/programas cometen errores? NO
- Defecto   Al cometer un error un humano, puede meter un DEFECTO en el producto.
- Fallo     Los defectos pueden manisfestarse al usar el producto en forma de FALLOS.

## Para qué sirven las pruebas?

- Asegurar el cumplimiento de unos requisitos
- Detectar la mayor cantidad posible de FALLOS antes de la entrega del producto.
  Una vez detectado un FALLO, debemos proceder a arreglar el DEFECTO que lo provoca.
  El proceso de identificar un DEFECTO desde el fallo que lo originó: DEPURACION o DEBUGGING.
  - Proveer la mayor cantidad posible de información que permita un rápido debugging.
- Detectar DEFECTOS antes de la entrega del producto.
- Haciendo un análisis de causas raíces, identificar los ERRORES que se están cometiendo, su origen y tomar acciones preventivas que eviten nuevos errores/defectos/fallos en el futuro.
- Aprender del sistema y buscar puntos de mejora

## Tipos de pruebas

Hay muchas formas paralelas de clasificar pruebas:

# En base al objeto de pruebas

- Pruebas funcionales:      Las que se centran en la funcionalidad del producto/componente
- Pruebas no funcionales
  - Carga
  - Estrés
  - Rendimiento
  - Seguridad
  - UX

# En base al modo de ejecución

- Pruebas dinámicas: Las que requieren ejecutar el producto para realizarse -> FALLOS
- Pruebas estáticas: Las que se realizan sin ejecutar el producto           -> DEFECTOS
                     SonarQube

## En base al conocimineto previo del sistema

- Caja negra: No se conoce el código fuente del sistema
- Caja blanca: Se conoce el código fuente del sistema

## En base al nivel de la prueba: SCOPE

Tren:
    Motor
    Asientos
    Ruedas
    Sistema de frenos

- Unitarias             Se centran en un único objetivo (como cualquier prueba) de un componente AISLADO
                        del sistema. 

                            Montaré 4 hierros mal soldaos (un bastidor), pondré el motor encima y le meto corriente a ver si gira!

                            Montaré 4 hierros mal soldaos... pondré el sistema de frenos, le meto corriente a ver si las pinzas de freno cierran.

                        Si todas van bien.. que gano? CONFIANZA +1 .Vamos bien.

- Integración           Se centra en la comunicación entre componentes del sistema.

                            Monto 4 hierros mal soldaos, monto ahí el sistema de frenos, le pongo en medio la rueda, echo la rueda a girar... y le meto corriente:
                            a ver si la rueda frena.
                            Y puede ser que no.

                        Si todas van bien... que gano? CONFIANZA +1. Vamos bien.

- Sistema(end2end)      Se centra en el sistema en su conjunto
                        Tengo ya el tren montaó... le doy al play... y va pa'tras!
                        El tren en su conjunto no se comporta como debe.
        
        Y si hago las pruebas de sistema y no he hecho ni pruebas de integración ni unitarias... y las de sistema van bien, necesito hacer las pruebas unitarias y de integración? PARA NADA !
        Si ya funciona el tren. Ya esta comprobado.. Será que todo funciona, sino el tren no funcionaría.

        Dónde está el truco? 
        - Y si van mal? Dónde está el problema? A desmontar el tren!
        - Y cuándo puedo hacer estas pruebas? Cuando tengo el SISTEMA ACABADO. No antes.
          Y entonces voy a ciegas todo el proyecto?

---

# Metodologías ágiles?


Las metodologías ágiles se crean para resolver muchos inconvenientes que se encontraban en las metodologías tradicionales (cascada, en espiral, RUP, V-Model, etc...).

Todas ellas se originan del manifiesto para el desarrollo ágil de software.

Entrega incremental del producto a mi cliente!

## Extraído del manifiesto ágil:

> El software funcionando es la medida principal de progreso > DEFINE UN INDICADOR PARA UN CUADRO DE MANDO
(1)

La MEDIDA principal de progreso es el "software funcionando"
Cómo mido (principalmente) el grado de avance (progreso, ¿cómo voy?) en un proyecto: SOFTWARE FUNCIONANDO

SOFTWARE FUNCIONADO? Software que funciona... que hace lo que debe... que está listo.
Quién dice eso? que el software está OK?
    - EL CLIENTE. NI DE COÑA!!!! RIDÍCULO !!!!
    - LAS PRUEBAS (contra una especificación: conjunto de requisitos)

Cuando nos vamos a una metodología ágil, lo que miro para saber cómo esta el proyecto es la cantidad de pruebas que he superado en una unidad de tiempo. 
    SI NO HAGO ESTO, NO ESTOY SIGUIENDO UNA METODOLOGÍA ÁGIL.

## Las metodologías ágiles han venido con sus propios problemas.

Me dices que tengo que hacer instalaciones en producción cada 3 semanas???? :$
Y de donde saco la pasta? y el tiempo? y los recursos? para estar cada 3 semanas haciendo instalaciones en PRODUCCION?... Además para poder pasar a producción, que tengo que hacer antes? PRUEBAS
En un entorno de pruebas... Otra instalación.
Y pruebas que se multiplican...
- PRIMERO: Pruebas a nivel de producción
- SEGUNDO:
  Entrega 1: 10% de la funcionalidad
        Pruebo el 10%
  Entrega 2: +5% de la funcionalidad
        Pruebo el 15% = +5 nuevo... y el 10% anterior.. que he tocado código... y he podido joder algo.
Y de donde saco la pasta? y el tiempo? y los recursos? para estar cada 3 semanas haciendo pruebas a ese nivel? 
NO LA HAY, ni pasta, ni tiempo, ni recursos. SOLO HAY UNA SOLUCIÓN: AUTOMATIZAR 
Necesito automatizar las pruebas y las instalaciones. Si no, no hay manera de seguir una metodología ágil.

# DEVOPS?

Una cultura, un movimiento, una filosofía en pro de la AUTOMATIZACION. Chic@s vamos a automatizar... El qué? Todo lo que haya entre el DEV--->OPS

## Integración Continua:

Tener CONTINUAMENTE la última versión del código que han hecho los desarrolladores y han dejado en git, en el entorno de INTEGRACION sometido a pruebas automatizadas.

Producto de un proceso de integración continua: UN INFORME DE PRUEBAS  ACTUALIZADO EN TIEMPO REAL!!! (1)

---

Angular es un proyecto que creó google para hacer aplicaciones web. 
Cubría una necesidad que empezamos a detectar hace 15 años-20 años, que era la de hacer aplicaciones basadas en componentes web.

De hecho, es por el mismo motivo que nace React, Vue, Svelte, Ember, Backbone, Knockout, Polymer, Stencil, LitElement, ...

El concepto componente WEB tiene que ver con el concepto de SPA: Single Page Application.

Las WEB han cambiado mucho desde sus orígenes. Tecnologías como php, asp, jsp, jsf, ... han quedado obsoletas.

Antiguamente cuando usábamos una arquitectura WEB:

ORIGEN DE LAS AQUITECTURA WEB
    CLIENTE                                 SERVIDOR
        Navegador            -http->            Servidor Web    
         Renderizado del                        HDD:
         HTML por pantalla                          - HTML
                                                    - CSS

Protocolo http: Especializado en envío de documentos HTML. (Esto es lo que creó TIM BERNERS-LEE)

EMPEZARON A APARECER LAS PRIMERAS APLICACIONES WEB
    CLIENTE                                 SERVIDOR
        Navegador            -http->            Servidor de Aplicaciones    
         Renderizado del                            Programas que generaban HTML
         HTML por pantalla                      HDD
            Ejecutar JS                             - CSS
                                                    - JS

## Pero esto ha cambiado... y mucho.

Primero, ya no usamos solo el protocolo HTTP... era muy limitante:
- El protocolo http está pensado para hacer peticiones síncrona: REQUEST -> RESPONSE
- El cliente SIEMPRE es el que origina la petición... y debe esperar la respuesta del servidor (SINCRONO)

Hoy en día usamos mucho otro protocolo que:
-  Permite al servidor mandar mensajes al cliente, sin que el cliente haya hecho una petición previa.
-  Nos permite comunicaciones asíncronas: WEBSOCKETS

    http://miapp.com
    ws://miapp.com

    CLIENTE                                 SERVIDOR
        AppWeb               -http->            Servidor de Aplicaciones    
         Renderizado del     <-ws ->            Programas que generan JSON
         HTML por pantalla                      HDD
            Ejecutar JS                             - CSS
         El HTML hoy en día se genera en cliente    - JS
         por programas JS
        App Android
        App iOS                                 dameBilletesQueTengo -> JSON
        App de escritorio

Por otro lado... ya no tengo un único frontal... tengo muchos frontales:
- Navegador web
- App nativa Android
- App nativa iOS
- App de escritorio
- Asistente de voz: Alexa, Siri, Google Assistant
- IVR: Respuesta de voz interactiva

Y HTML ha perdido mucha relevancia.. entre otras cosas por que es un lenguaje de propósito específico... para el formato de documentos:
    <html>
        <head>
            <title>Titulo</title>
            <style>
                h1.gordo {
                    font-weight: bold;
                    font-family: Arial;
                    font-size: 24px;
                }
            </style>
        </head>
        <body>
            <h1 style="gordo">Titulo</h1>
            <p>Parrafo</p>
            <ul>
                <li>Elemento 1</li>
                <li>Elemento 2</li>
            </ul>
        </body>
    </html>
Y necesitamos formatos neutros de envío de información: JSON, XML, YAML,
El que se ha convertido en estándar es JSON.

Empiezo a crear mogollón de Apps WEB.
Que compartiran muchas estructuras.. cosas... paneles..

Conocéis la marca html: <usuario>?
No porque no existe!


Pero... yo la puedo crear:
    <usuario id="1292839031"/>
Y explicarle al navegador cómo debe comportarse ante esa marca HTML:
- Representación

  +--------+---------------------+ 
  |        |  Nombre: Felipe     |
  | O    O |  Apellidos: Felipón |
  |   __   |  Emailio:           |
  |        |          [MENSAJE]  |
  | \____/ |                     |
  +--------+---------------------+ 

- Lógica del componente

  Preguntes a un servicio en Backend por el id del usuario, capturas sus datos en JSON y los pintas en el panel.
  Si le aprietas al botón de mensaje, se abre un modal con un formulario para enviar un mensaje al usuario. 

Y este componente posiblemente lo voy a usar en 27 apps que crearé en la empresa:
- App de solicitud de vacaciones
- App de control de gastos
- App de gestión de expedientes

Me gustaría poder reusar ese componente... y no solo eso...
Que ese componente pueda mutar. Que dinámicamente pueda cambiar su contenido: SPA: Single Page Application

Hoy en día tenemos una app web, que solo tiene un único fichero HTML:
<html>
    <head>
        <title>App</title>
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>

Hace ya años, que el W3C (World Wide Web Consortium, que es la organización que fundó Tim Berners-Lee para estandarizar la web) creó un estándar para poder crear componentes web: WebComponents, igual que está el estándar para crear documentos HTML: HTML, CSS, XML.

Y los navegadores soportan NATIVAMENTE los WebComponents.
Y lo exportan mediante una API: CustomElements, que tenemos disponible en JS.

---

Vamos a crear un proyecto para trabajar usando una herramienta clave en el mundo JS: npm

## Sabemos que es npm?

Una herramienta de automatización de tareas habituales en proyectos JS:
- compile
- test
- package
- sonar:sonar
- Gestión de dependencias

## Qué es maven?

Una herramienta de automatización de tareas habituales en proyectos principalmente JAVA:
- compile
- test
- package
- sonar:sonar
- spring-boot:run
- docker:build
- javadoc:javadoc
- covertura:cobertura
- Gestión de dependencias

--- 
En paralelo, nosotros vamos a usar un framework que nos va a permitir crear aplicaciones web basadas en componentes web: Angular.

Y angular (que instalaremos mediante npm) trae su propia herramienta cli: ng, que nos ayuda a automatizar tareas habituales en proyectos Angular:
- compile
- test
- package
- Crear componentes, servicios, módulos, directivas, pipes, guards, interceptors, resolvers, ...

---

Un proyecto gestionado mediante npm, tiene un fichero de configuración que se llama package.json, que sería equivalente en el mundo maven al archivo pom.xml

En ese archivo vamos a definir:
- Coordenadas del proyecto: Nombre, versión
- Metadata del proyecto: Descripción, autor, licencia, url, repositorio git
- Scripts/ tareas de automatización: build, test, start, deploy
- Dependencias del proyecto: Angular...

Esas dependencias necesitaremos tenerlas disponibles en nuestro entorno / máquina...
Por ejemplo, en maven cuando descargo una dependencia se almacena en el directorio .m2 de mi carpeta de usuario. Todos los proyectos java que monto con maven comparten carpeta de dependencias... EN NPM NO.
Cada proyecto tiene su propia carpeta de dependencias: node_modules, que contendrá todas las dependencias que necesite mi proyecto.
Las dependencias en NPM se gestionan a 2 niveles:
- Para desarrollo
- Para producción
Por ejemplo esto en MAVEN se gestiona mediante los SCOPE de las dependencias.

- Algunos comandos básicos de npm son:
    npm init
    npm install --dev jasmine           # Desarrollo
    npm install --dev cucumber          # Desarrollo
    npm install @angular/core           # Producción
    npm uninstall jasmine               # Desarrollo

NPM no lo instalo de forma independiente... viene con NODEJS.
Lo que vamos a instalar es NODEJS... y con él vendrá NPM.

Puedo tener varias versiones de node: nvm (node version manager)
- Con nvm puedo instalar varias versiones: nvm install 14.17.0
- Elegir la que se usa por defecto: nvm use 14.17.0
- O la que quiero para un proyecto en concreto: nvm use 12.18.0

Adicionalmente en nuestro caso, vamos a instalar Angular CLI:
- npm install -g @angular/cli
Vamos a trabajar con Angular 17... ya ha salido la versión 18... el mes pasado... no nos aventuramos tan pronto con la 18.
- npm install -g @angular/cli@17
Esto podría colisionar con otras versiones de Angular CLI que tengamos instaladas... 
Y me puede interesar instalar una versión del cliente de Angular CLI para un proyecto en concreto:
- npm install @angular/cli@17

Una vez instalado el cliente de Angular CLI, puedo crear un proyecto Angular:
- ng new miProyecto (que por debajo hará un npm init)

Y a partir de ahí empezar a configurar mi aplicación Angular.

Que sabéis cuando código voy a tener en mi proyecto... mi función ejecutable (el main de java?)?
1 linea: Angular... ejecuta mi aplicación. Aquí entra el contenedor de inversión de control.
A partir de este momento yo ya DEJO DE CONTROLAR EL FLUJO DE MI APLICACIÓN... y lo delego en Angular.

Claro... Angular lo flipa! Y me dice, tu aplicación???? pues qué hace tu aplicación?
Y mi trabajo es detallar (explicar, declarar) a Angular qué hace mi aplicación.
- Quiero tener un componente que muestre un panel con un usuario.
- Quiero tener un componente que muestre un panel con un mensaje.
- Quiero tener un componente que muestre un panel con un formulario para enviar un mensaje.
- Quiero un servicio que me permita obtener los datos de un usuario.
- Quiero..
- Quiero..
- Quiero..

Un comando que usaremos mucho del cliente de Angular CLI es:
- ng serve
  Hace un huevo de cosas:
  - Transpila mi aplicación de TS a JS
  - Crea un servidor web en mi máquina
  - En ese servidor, sirve mi aplicación
  - Abre un navegador y carga mi aplicación
  - Monitoriza los cambios en mi aplicación y redespliega automáticamente en el servidor
  - A nivel del navegador, ir identificando los cambios y refrescando la página automáticamente
Hasta que acabe mi desarrollo... momento en el que ejecutaré:
- ng build --prod
  Que me generará una carpeta dist con mi aplicación lista para ser desplegada en producción.

El empaquetado será una carpeta llena de ficheros JS, CSS, HTML, imágenes, fuentes, ...
Listas para ser servidas por un servidor web (NGINX, APACHE HTTPD)

Pregunta... quien ejecutará finalmente nuestro JS? El intérprete JS de mi navegador.
Y entonces, para quiero NODEJS

Requiere una aplicación Angular el tener instalado NodeJS para ejecutarse? NO
Y entonces, qué pinta NodeJS en todo esto? por qué hemos dicho que lo vamos a instalar lo primero?
Para ayudarnos a desarrollar el proyecto:
- Transpilar
- Validarlo
- Probarlo
- Empaquetarlo

Usaremos para transpilar programas que hay desarrollados en JS... que ejecutaremos en nuestra máquina...
fuera de un navegador... y para eso necesitamos un intérprete de JS... y ese intérprete es NODEJS.
Y para hacer pruebas... necesitamos un intérprete de JS... y ese intérprete es NODEJS.

Normalmente no usamos el concepto de ofuscación: Minificación:
Reducir el tamaño de los ficheros JS, CSS que voy a entregar al cliente.
Van a viajar por red... y cuanto más pequeños sean... mejor... mucho mejor.
Y en lugar de darle 50 ficheros js... le daré 1 solo fichero JS... que contenga todo mi código.
De esa forma el navegador solo debe hacer 1 petición... y no 50... y eso es más rápido.

En el proceso de minificación, quitaré todos los espacios en blanco, saltos de linea...
Al final entrego un fichero JS de 50Kbs que contiene 1 sola linea de código.
Y cambiaré los nombres de las variables : numeroDeExpedientesAbiertos -> a
Para que ocupe menos... De paso me generará algo infumable.
Para todos y para mi (lo cual es un problema de cara a la depuración).
En tiempo de desarrollo, no minifico... en tiempo de producción, minifico.
Y será necesario contar con unos mapas de depuración: ficheros que me permitan mapear el código minificado con el código original.... sino me vuelvo loco!
---

En los SO tenemos gestores de paquetes:
- Debian : apt  (Instala software directamente de los repositorios de Debian)
- RedHat : yum  (Instala software directamente de los repositorios de RedHat)
- Fedora : dnf  (Instala software directamente de los repositorios de Fedora)
- Windows: Tienda de aplicaciones
- Windows: Chocolatey
- MacOS  : Homebrew

---
Dentro de un proyecto gestionado con npm,
podemos usar el comando npx para ejecutar paquetes que hayamos descargado en el proyecto.