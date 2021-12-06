import React, {useState} from 'react'
import Todo from './Todo';
import TodoForm from './TodoForm';

function TodoList() {

    const [todos, setTodos] = useState([]);

    const addTodos = todo => {                                                       //todo is being passed as a param
        if(!todo.text || /^\s*$/.test(todo.text)) {return;}                          //a simple condition that will check the following condition every time you add a new todo
        /* 
        Here ^ means the beginning of expression.
        \s* means 0 or more occurrences of space characters(' ', tab etc)
        $ means end of the string.
        so /^\s*$/ is the regex for empty string or string with only spaces.
        */
        const newTodo = [todo, ...todos];                                            //create a newTodo[] and push new items to the prev list of items, each new item gets added
        setTodos(newTodo);                                                           //then set the state "todos" using setTodos = newTodo
    }

    const removeTodo = id => {                                                       //get the id from the <div> on which the delete icon was clicked
        const filteredTodos = [...todos].filter(todo => todo.id !== id);             //this will remove the todo with that particular id fromt the list
        setTodos(filteredTodos);                                                     //and now set state "todos" to the "filteredTodos"
    }

    const editTodo = (todoId, newValue) => {
        if(!newValue.text || /^\s*$/.test(newValue.text)) {return;}                  //on edit we want to check the same logic for white spaces 
        setTodos(prev => prev.map(item => item.id === todoId ? newValue : item))     //if the id matches with the edit todo id then change the state otherwise keep the prev state
    }

    const completeTodo = id => {                                                     //get the id from the <div> that was clicked
        let updatedTodos = todos.map(todo => {                                       //map through all the todos and
            if(todo.id === id) {                                                     //find the todo item with the id from <div>
                todo.isComplete = !todo.isComplete;                                  //and set isComplete to True|False only for that particular id
            }
            return todo;                                                             //push all the todos in updatedTodos
        })
        setTodos(updatedTodos);                                                      //set state "todos" to updatedTodos using setTodos
    }

    return (
        <div>
            <h1>What's the plan?</h1>
            <TodoForm onSubmit={addTodos}/>
            {/*passing all the above functions as a prop to Todo component*/}
            <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} editTodo={editTodo}/>
        </div>
    )
}

export default TodoList
