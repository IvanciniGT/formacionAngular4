# Angular

Framework para el desarrollo de aplicaciones usando TS.
Vamos a poder usarlo para crear aplicaciones web... y otras (mobile, backend...).

Angular es un contenedor de inversión de control:
- Nos controla el flujo de la app.
Como consecuencia de eso nos facilita MUCHO el uso de un patrón de inyección de dependencias.
Asu vez eso nos permite respetar el ppo de Inversión de Dependencias (uno de lso 5 principios SOLID).


# TS

Un lenguaje creado para suplir la falta de tipado estático en JS.
Lo que hacemos es escribir programas en TS y luego los transpilamos a JS.
En ese proceso de Transpilación:
- Se validan los tipos
- Se eliminan los tipos
- Se generan los archivos JS.


# Node

Es el antiguo motor de procesamiento de JS que viene en el navegador Chromium.
El tenerlo fuera de un navegador nos permite ejecutar programas JS fuera de un navegador... 
Y esto fue trascendental. Desató todo el poder de JS.


# JS -> ES

Ha evolucionado mucho... en parte gracias a la ECMA, que genera especificaciones de JS.


# NPM

Es una herramienta que nos permite automatizar tareas de nuestro proyecto:
- Transpilación
- Ejectución de tests
- Ejecución de la app
- Ciertas validaciones estáticas
- Gestión de dependencias

Al trabajar en unu proyecto con npm, debemos tener un archivo package.json que nos va a permitir definir:
- Las coordenadas del proyecto (nombre, versión)
- Metadata del proyecto: descripción, autor, licencia...
- Scripts: comandos que podemos ejecutar
- Dependencias: librerías que necesitamos para que nuestro proyecto funcione o para ayudarnos a desarrollar nuestro proyecto:
  - Dependencias de producción
  - Dependencias de desarrollo

Si al final estamos montando una app web, esa app se ejecutará sobre el interprete de JS que tengamos en el navegador. Pero para desarrollo, necesito muchas cosas:
- Un servidor web, donde poder alojar los archivos html, imágenes, css, y los programas js para que los podamos ejecutar/probar desde un navegador
- Vamos a necesitar transpilar los archivos TS a JS
- Vamos a querer ejecutar pruebas automáticas
Para esas cosas, no usaremos un navegador, sino programas que ejecutamos desde la terminal.
Y usaremos node como motor de JS para ejecutar esos programas. 

Con npm hay tareas habituales:
- npm init: para crear un package.json
- npm install [-g] DEPENDENCIA [-D]: para instalar una dependencia
  -g: para instalar la dependencia de forma global. Si no lo ponemos, la dependencia se instalará en el proyecto (se descargan a la carpeta node_modules, carpeta que NO QUERREMOS que forme parte de nuestro repositorio de git).
  -D: para instalar una dependencia de desarrollo. Si no lo ponemos, la dependencia se instalará como dependencia de producción.... y en este caso, al empaquetar nuestro proyecto, se incluirá en el paquete que se genere.


Esas dependencias de desarrollo, suelen traer programas que vamos a ejecutar desde la terminal.
Será necesario que nuestro sistema operativo tenga acceso a esos programas.... lo primero que los encuentre en el PATH.

Para evitarnos mucho rollo con eso, podemos echar mano de otro comando:
- npx DEPENDENCIA: ejecuta un programa que está en una dependencia de desarrollo, sin necesidad de configurarlo en el sistema operativo.
  - Si el programa no está en el PATH, npx lo buscará en la carpeta node_modules de nuestro proyecto.
  - Si no lo encuentra, lo descargará de internet y lo ejecutará.
  - Si lo encuentra, lo ejecutará.

---

Las extensiones de VSCode = RUINA GORDA ! No las queremos... eso es para principiantes que no saben muy bien lo que hacen.
No es cierto... y nos ayudan... pero no me evitan configurar estas cosas!

Al final mi código va a subir a un repo de  al repo de git ni subo:
- node_modules
- dist
Solo subo el código fuente.

Las pruebas, verificaciones... y demás que hagamos en nuestro entorno NO VALEN PARA NADA DE NADA .

Mi entorno con muchisimas probabilidades esta maleao! Tengo instaladas cosas raras... configuaos paths a huevo...

Mi proyecto le usan un huevo de compañer@s, que van a tener sus propios entornos, y configuraciones.

Al final, lo que queremos es que un programa!!!! saque nuestro código de git, lo compile, lo ejecute, lo pruebe... y nos diga si está bien o mal. En un entorno LIMPIO, sin malear!
Y en ese entorno no habrá VSCODE, ni extensiones, ni nada de nada. SOLO UNA TERMINAL!

Y en ese entorno ejecutaremos tareas de npm (SCRIPTS). TODO HE DE DEJARLO CONFIGURADO EN EL PACKAGE.JSON.

