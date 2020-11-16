import { Todo } from './todo.class';

export class TodoList {
    
    constructor (){
        
        // this.todos = [];
        this.cargarLocalStorage();
    }
    nuevoTodo( todo ){
        this.todos.push( todo );
        this.guardarLocalStorage();
    }
    eliminarTodo ( id ) {
        // al guardar la lista de los que NO coinciden, se queda un array con los no eliminado.
        this.todos = this.todos.filter( todo => todo.id != id );
        this.guardarLocalStorage();
    }
    marcarCompletado( id ) {

        for ( const todo of this.todos ){
            // console.log(id, todo.id);
            // el id es texto y el id es numerico por eso ==
            if( todo.id == id) {
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }
    eliminarCompletados() {
        // regresará los elemenos NO completados
        this.todos = this.todos.filter( todo => !todo.completado );  
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){

        localStorage.setItem('todo', JSON.stringify( this.todos ));
    }
    cargarLocalStorage(){
        this.todos = (localStorage.getItem('todo')) 
                        ? JSON.parse(localStorage.getItem('todo') ) 
                        : [];

        // convertimos el JSON en un objeto
        this.todos = this.todos.map( obj => Todo.fromJson( obj ) );

        // if( localStorage.getItem('todo')) {
        //     this.todos = JSON.parse( localStorage.getItem('todo') );
        //     console.log('cagarLocal:', this.todos );
        //     console.log(typeof(this.todos) );
        // } else {
        //     this.todos = [];
        // }

    }

}