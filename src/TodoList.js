import React from 'react'
import Todo from './Todo'

//this is the component for the actual list itself
// here, todos and the toggleTodo are props that we pass from App.js to be used
// *Props are like parameters but htey can only be passed one way, from parent to child
export default function TodoList({ todos, toggleTodo }) {
  return (
        // here .map will loop over all of our todos and an anonymous function will convert each todo from todos
        // into an actual Todo element as importee from Todo.js
        // anytime that we need to use JavaScript code within our react returns, use the curly braces "{}" to isolate 
        // JavaScript code
        todos.map(todo => {
            return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} />
        })

  )
}
