
function saluda(nombre) {
    console.log(`Hola ${nombre}`);
}

//saluda('Pepe'); // Hola Pepe

let miFuncion = saluda; // Aqui no ejecuto saluda... La referencio... como si fuera un dato más
miFuncion('Juan'); // Aquí es donde ejecuto la función saluda... eso si, desde una variable que apunta a ella.

////

function generarSaludoInformal(nombre) {
    return `Hola ${nombre}`;
}

function generarSaludoFormal(nombre) {
    return "Buenos días " + nombre;
}

function imprimirSaludo(funcionGeneradoraDeSaludos, nombre) {
    console.log(funcionGeneradoraDeSaludos(nombre));
}

imprimirSaludo(generarSaludoInformal, 'Pepe'); // Hola Pepe
imprimirSaludo(generarSaludoFormal, 'Pepe'); // Buenos días Pepe

/// Sintaxis alternativa para declarar funciones... Mediante expresiones lambda (usando el operador flecha =>)
// Que es una expresión lambda: De entrada una expresión:

let texto = "hola"; // Statement (Declaración, Sentencia, Enunciado = FRASE en JS)
let numero = 5+6;   // Otro statement
             ///       Expresión (Una expresión es un trozo de código que devuelve un valor)
// Que es una expresión lambda? 
// Es un trozo de código que devuelve una referencia a una función anónima declarada dentro de la propia expresión.


let funcionQueQuieroUsar = (nombre) => {
    return "Estimado " + nombre;
};

funcionQueQuieroUsar = (nombre) => "Estimado " + nombre;
funcionQueQuieroUsar = nombre => "Estimado " + nombre;

imprimirSaludo(generarSaludoFormal, 'Pepe'); // Buenos días Pepe
imprimirSaludo( nombre => "Estimado " + nombre , 'Pepe'); // Buenos días Pepe
