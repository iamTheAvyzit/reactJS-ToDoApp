import React, { useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import TodoForm from './TodoForm'

function Todo({todos, completeTodo, removeTodo, editTodo}) {                                        //destructuring the functions from props recieved via TodoList component

    const [edit, setEdit] = useState({                                                              //this state is used, when user clicks on edit icon to edit an existing todo
        id: null,
        value: ''
    })

    const submitUpdate = value => {                                                                 //gets called when the user clicks on "Update" button in the first fragment
        editTodo(edit.id, value)                                                                    //pass the edit.id and value to editTodo() in TodoList component
        setEdit({
            id: null,
            value: ''
        })
    }

    if(edit.id) {                                                                                  //if the user is in edit mode,
        return <TodoForm edit={edit} onSubmit={submitUpdate}/>                                     //then pass the edit as a prop(edit.id and edit.value) and call submitUpdate()
    }

    return todos.map((todo, index) => (
        <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={index}>                     {/*the condition checks whether a todo was complete and toggles the className accordingly*/}
            <div key={todo.id} onClick={() => completeTodo(todo.id)}>                                        {/*when this div is clicked, completeTodo() will be called and it will toggle the div color based on isComplete value*/}
                {todo.text}                                                                                  {/*render the todo text*/}
            </div>
            <div className="icons">
                <AiOutlineDelete className="del-icon" onClick={()=> removeTodo(todo.id)}/>
                <BiEdit className="edit-icon" onClick={()=> setEdit({id:todo.id, value:todo.text})}/>
            </div>
        </div>
    ))
}

export default Todo
