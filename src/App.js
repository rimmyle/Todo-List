//imports multiple libraries from react
import React, { useState, useRef, useEffect} from 'react';
// imports the TodoList object from TodoList.js by using the "./" which refers to the current directory
import TodoList from './TodoList'
// uuid is a tool which provides unique and random id values for HTML elements that are created
import { v4 as uuidv4 } from 'uuid';

// localstorage key where the todo list wil be stored so that it doesn't disappear after a refresh
const LOCAL_STORAGE_KEY = 'todoApp.todos'

// main app
function App() {
  // this is our default state, where todos is all of our todos and setTodos is the function we call to make
  // changes to our todo list
  // useState is a Hook (function) that allows you to have state variables in functional components. You pass the initial state to this function and it returns a variable with the current state value (not necessarily the initial state) and another function to update this value
  const [todos, setTodos] = useState([])
  // useRef allows us to reference things that are within the actual HTML such as input or just what the element itself is
  const todoNameRef = useRef()
  

  // useEffect allows our app to do something when a certain element as denoted in the array is affected
  // if ithe array is left empty useEffect will run once when the page loads and never again
  // In this case, useEffect is used to see if there is a pre-existing todo list within local storage
  // and will load that list up if one is found
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos( prevTodos => [...prevTodos, ...storedTodos] );
  }, [])

  // as indicated in the array, whenenevr our todo list is affected here, the useEffect will trigger our localstorage
  // to update it's value in order to retain our list after refreshes to the browser.
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  // This function takes care of the toggling of completed and non completed todos using the id that is
  // attached to each todo
  function toggleTodo(id) {
    // the ... operator essentailly takes all the elements of the object it's used on and fills it in
    // so here ...todos will fill the array of newTodos with all of the elements of todos
    const newTodos = [...todos]
    // this finds the todo with the matching id that was passed into the function and toggles it's
    // complete property to the opposite of whatever it was before
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }
  // this function takes care of the button which gets rid of our todos that are already complete
  function handleClearTodos() {
    // here, newTodos filters out our current todos for todos that are not complete, and sets our current
    // todos to what ever is left
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  // this function is responsible for adding todos
  function handleAddTodo(e) {
    // name refers to the todoNameRef const declared above to retrieve the name of the todo from the input HTML
    const name = todoNameRef.current.value
    
    if (name === '') return
    // the first parameter of setTodos here gives us the previous todo by default which has nothing to do with the 
    // naming  of the parameter, but is then defined as an anonymous functions to return all the previous todos
    // along with the new todo with the name from the input.
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    //this is a small quality of life line of code which just clears in the input box after the todo with has been 
    // created with the previously accompanying texts
    todoNameRef.current.value = null
  }


  // This is where our compnents and functions get returned to the webpage as html using jsx
  return (
    <>
    <TodoList todos = {todos} toggleTodo = {toggleTodo} />
    <input ref={todoNameRef} type= "text" />
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos}>Clear Completed Todos</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  );
}

export default App;
