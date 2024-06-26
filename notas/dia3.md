Los componentes tienen un ciclo de vida en Angular:

Cuando el navegador encuentra una marquita html asociada a un componente que he definido, empieza la vida del componente:
1º Se instancia la clase del componente => se invoca el constructor
2º Se inicializan las propiedades del componente (INPUT)
3º Se invoca al método ngOnInit
    Normalmente cuando necesitamos hacer operaciones de Inicialización del componente las hacemos en el onInit,
    ya que hasta este punto no tenemos acceso a las propiedades del componente.
4º Si las propiedades cambian, se invoca ngOnChanges
....


# DOM

Document Object Model

El navegador cuando carga un html, lo convierte en un árbol de nodos, donde cada nodo es un objeto (DOM).
El javascript puede acceder a estos nodos y modificarlos, de forma discreta (uno a uno)
Angular, cuando re renderiza un componente, cambia de su dom la parte que toque... no todo el dom.

Esto posibilita el montar un SPA: Single Page Application, donde solo se carga una vez el html -> DOM -JS-> Voy editando el DOM.