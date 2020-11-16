// La class="completed" 'tacha' la tarea
// type="checkbox" checked indica si está completada o no
// La class "destroy" es el boton para eliminar
// Referencias en el HTML
import { Todo } from '../classes'
import { todoList} from '../index'

const divTodoList       = document.querySelector('.todo-list');
const txtInput          = document.querySelector('.new-todo');
const btnCompletados    = document.querySelector('.clear-completed');
const ulFiltros         = document.querySelector('.filters');
const anchorFiltros     = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {
    const htmlTodo = `
    <li class="${(todo.completado) ? 'completed':'' }" data-id="${todo.id}">
        <div class="view">
        	<input class="toggle" type="checkbox" ${(todo.completado) ? 'checked':'' } >
			<label>${ todo.tarea }</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`
    // Elemento html
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append ( div.firstElementChild );

    return div.firstElementChild;
}


// Eventos
// Cuando escribe algo y pulsa enter, guardar la lista
txtInput.addEventListener('keyup', ( event ) =>{
    // console.log(event);
    if ( event.keyCode === 13 && txtInput.value.length > 0) {
        const nuevoTodo = new Todo (txtInput.value);
        
        todoList.nuevoTodo( nuevoTodo );

        crearTodoHtml( nuevoTodo );
        txtInput.value = "";
    }

});

// Cuando marca el check de completado
divTodoList.addEventListener('click', ( event ) =>{
    const nombreElemento = event.target.localName;
    const todoElemento   = event.target.parentElement.parentElement; 
    const todoId         = todoElemento.getAttribute('data-id');

    if ( nombreElemento.includes('input') ) { //hizo click en el checkbox
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');   
    } else if ( nombreElemento.includes('button') ) {
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );
    }

    // console.log(nombreElemento, todoElemento, todoId);
    // console.log( todoList);

});

// al pulsar el botón 'Completados'
btnCompletados.addEventListener('click', () =>{
    // console.log('Has pulsado el botón completado');
    // todoList.marcarCompletado( todoId );
    todoList.eliminarCompletados();
    // borrar de abajo a arriba
    for (let i = divTodoList.children.length - 1; i >= 0; i-- ) {
        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }

});

ulFiltros.addEventListener('click', ( event ) =>{
    
    const filtro  = event.target.text;
    // validamos que tenga texto
    if ( !filtro) { return; }
    // eliminar el recuadro de los filtros
    anchorFiltros.forEach ( elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');
    
    for( const elemento of divTodoList.children ) {
        // console.log(elemento);   
        elemento.classList.remove('hidden');
        // para  considerar aquellos ocultos (que tienen clase oculta)
        const completado = elemento.classList.contains('completed');
        
        switch ( filtro ) {
            case 'Pendientes':
                if ( completado ) {
                    console.log('pulsa pendiente');   
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados':
                if ( !completado ) {
                    elemento.classList.add('hidden');
                }
            break;

        }
    }
});


