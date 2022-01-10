import React, { useState, useEffect, useRef } from 'react'

function TodoForm(props) {

    const [input, setInput] = useState(props.edit ? props.edit.value : '');            //if we are updating an existing one then set the todo to the value else set it to empty

    const focusRef = useRef(null)                                   //on page reload automatically focuses on the <input>
    
    useEffect(()=>{                                                 //same as componentDidMount
        focusRef.current.focus()
    })
    
    const handleChange = e => {                                     //onChange handler for input tag, so when we type inside input tag,
        setInput(e.target.value);                                   //and we basically fetch by e.target.value and set the state "input" by using setInput
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.onSubmit({
            id: Math.floor(Math.random() * 10000),                  //assigns a random key to each todo item
            text: input                                             //takes the value from state "input" assigned by setInput
        });
        setInput('');                                               //it will clear the input tag, every time you click on "ADD" button(which is set for onSubmit),
    }

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            { props.edit ? (                                                             //checks if you're updating an existing todo, if yes render the first fragment else render the second one
            <>
            <input className='todo-input edit' placeholder='update this todo' name='text' value={input} onChange={handleChange} ref={focusRef}/>
            <button className='add edit' onClick={handleSubmit}>Update</button>
            </>
            ) 
            : 
            (
            <>
                <input className="todo-input" name="text" value={input} placeholder="Add a new todo" onChange={handleChange} ref={focusRef}/>
                <button className="add" onClick={handleSubmit}>ADD</button>
            </>
            )}
        </form>
    )
}

export default TodoForm
