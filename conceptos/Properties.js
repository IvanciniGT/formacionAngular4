
class MiClase {

    nombre = undefined;
    _edad = 0;

    constructor( nombre, edad ) {
        this.nombre = nombre;
        this._edad = edad;
    }

    set edad( value ) {
        if( value < 0 ) {
            throw new Error( 'La edad no puede ser negativa' );
        }
        this._edad = value;
    }
    get edad() {
        return this._edad;
    }

}



////////////////////


const instancia = new MiClase( 'Pepe', 30 );

console.log( instancia.nombre );

instancia.nombre = "Lucas";
instancia.edad = 25;
console.log( instancia.nombre );
console.log( instancia.edad );
