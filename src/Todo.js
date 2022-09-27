// use "rfc" to get the skeleton code for any react components!

import React from 'react'

// here the todo, and toggleTodo are passed from the Todolist.js and creates each
// individual todo using both of those properties
export default function Todo({ todo, toggleTodo }) {
    // this functions handles the event that the todo toggle has been clicked on and handles the toggle
    // by calling toggleTodo from App.js to make the actual change
    function handleTodoClick() {
        toggleTodo(todo.id)
    }

    // this returns each todo as html using the propties from the todo prop
  return (
    <div>
        <label>
            <input type="checkbox" checked={todo.complete} onChange={handleTodoClick}/>
            {todo.name}
        </label>
        
    </div>
  )
}
