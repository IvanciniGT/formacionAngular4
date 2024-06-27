//

// async    Una función puede declararse Asincona (simplemente lo pongo antes del nombre de la función)
//          - eso significa que la función va a devolver una promesa (explicita o implicitamente).
//          - puedo usar await dentro de la función
//          - cuando se ejecute un await, se pausa la ejecución de la función...
// await    Se pone delante de una promesa
//          Pausa la ejecución de una función hasta que la promesa tiene un valor (se resuelve la promesa)
//          Solo puede usarse dentro de una función async
//          await devuelve el valor de la promesa   
// Promise  Un objeto que representa un valor... que en algún momento estará disponible
//          Y me ofrece métodos para saber si ya lo tengo disponible
//              .then(  FUNCION ) ... Lo que hacemos con esto es dejar configurado que cuando tengamos el valor, se ejecute la función que le pasamos
//              .catch( FUNCION ) ... Lo que hacemos con esto es dejar configurado que si hay un error mientras se obtiene ese valor, se ejecute la función que le pasamos
// El concepto de Promesa existe en muchos lenguajes de programación. EN JAVA?

function contar(id, numero,maximo, ritmo) {
    if(numero > maximo) return;
    console.log(id, numero);

    setTimeout(() => {
        contar(id, numero+1, maximo, ritmo);
    }, ritmo);
}

//contar("A", 1, 10, 1000);
// Quiero que B no empiece a contar hasta que A haya terminado
//contar("B", 1, 20, 500);

async function dividir(numero1, numero2){
    const resultado=new Promise( (resolve, reject) => {
        // El código que ponemos aquí dentro es el que se ejecutará cuando el hilo de ejecución tenga un rato
        setTimeout( () => {
            if(numero2 === 0) reject("Error al hacer los calculos. No puedo dividir entre 0")
            else resolve(numero1/numero2);
        }, 2000);
    } );
    return resultado;
}

async function iniciar(){
    let dato=dividir(1,2); // Una función que tardará un montón: 2 segundos
    console.log("quiero hacer más cosas mientras se calcula el dato.")
    const valorReal = await dato;
    console.log(valorReal); // Quiero hacer cosas con el dato
}

async function iniciar2(){
    // ABRO TRANSACCION A BBDD
    dividir(1,0).then( valor => console.log(valor) ) // Te dejo programada una funcion que ahora no se ejecuta... sino cuando la promesa se resuelva. Tengas el dato
                .catch( error => console.log("Ha habido un error: ", error) ); // Te dejo programada una función que se ejecutará si hay un error
    
    // Pero tu sigue a lo tuyo mientras tanto
    console.log("quiero hacer más cosas mientras se calcula el dato.")
}

//iniciar();
iniciar2();

// En Angular no usamos prácticamente Promesas.... Usamos otro concepto muy similar... pero mucho más potente: Observables
// Angular viene de serie con una librería que se llama RxJS que es la que nos permite trabajar con Observables
// La diferencia de un observable con una promesa es que un observable puede emitir varios valores... no solo uno
// Lo que hacemos es subscribirnos al observable, y al subscribirnos, entregamos una función
// Esa función será invocada cada vez que el observable emita un valor

// Luego hay locuras grandes... Podemos construir una colección de funciones que se ejecutarán sobre los valores que emita el observable
// Tomando cada una el resultado de la anterior... y así sucesivamente (en cascada)