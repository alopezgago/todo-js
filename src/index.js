
import './styles.css';

import { Todo, TodoList} from './classes';
import { crearTodoHtml } from './js/componentes';

export const todoList = new TodoList();


// todoList.todos.forEach( todo => crearTodoHtml( todo ));
todoList.todos.forEach( crearTodoHtml );

// const newTodo = new Todo('Aprender Javascript');
// todoList.nuevoTodo( newTodo);
// newTodo.imprimirClase();
console.log( 'todos:', todoList.todos );
// todoList.todos[0].imprimirClase();



// const tarea = new Todo('Abrazar a Olga');
// todoList.nuevoTodo( tarea );

// console.log(tarea, todoList);
// crearTodoHtml( tarea );

// localStorage.setItem('miKey','lsABC1234');
// sessionStorage.setItem('miKey','ssABC1234');

// setTimeout( () =>{
    // localStorage.removeItem('miKey');
    // sessionStorage.removeItem('miKey');
// },1500);

