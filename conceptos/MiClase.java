public class MiClase {

    public String nombre = null;
    private int edad = 0;

    public MiClase(String nombre, int edad ) {
        this.nombre = nombre;
        this.setEdad(edad);
    }
    // Libero este código.
    // Y la gente empieza a usarlo (YO y mis amigüit@s)
    // Y dentro de un año, me doy cuenta que quiero que la edad no pueda ser negativa
    public void setEdad(int edad) {
        if(edad>0) throw new IllegalArgumentException("La edad no puede ser negativa");
        this.edad = edad;
    }
    public int getEdad() {
        return this.edad;
    }
    // Los getter y los setter de JAVA son una buena practica en JAVA... debido a la mierda de lenguaje que es y a sus definiciencias.
    // Van orientados a la mantenibilidad del código.
}


/*

MiClase instancia = new MiClase( "Pepe", -1 );

System.out.println( instancia.nombre );

instancia.nombre = "Juan";
instancia.edad = -1;
System.out.println( instancia.nombre );
System.out.println( instancia.edad );

*/