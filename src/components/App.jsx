import '../reset.css'
import '../App.css'
import { useState } from 'react'
import { NoTodos } from './NoTodos'
import { TodoForm } from './TodoForm'
import { TodoList } from './TodoList'

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Finish React Series',
      isComplete: false,
      isEditing: false,
    },
    {
      id: 2,
      title: 'Go Grocery',
      isComplete: true,
      isEditing: false,
    },
    {
      id: 3,
      title: 'Take over world',
      isComplete: false,
      isEditing: false,
    },
  ])

  const [idForTodo, setIdForTodo] = useState(4)

  // Function that adds new tasks
  const addTodo = todo => {
    // Copy array and add a new task
    setTodos([
      ...todos,
      {
        id: idForTodo,
        title: todo,
        isComplete: false,
      },
    ])

    // Copy previouse idForTodo and increment + 1
    setIdForTodo(prevIdForTodo => prevIdForTodo + 1)
  }

  // Function that deletes tasks
  const deleteTodo = id => {
    // If todo contains a task with id then remove
    setTodos([...todos].filter(todo => todo.id !== id))
  }

  const completeTodo = id => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete
      }
      // Because it´s a map we have to return it
      return todo
    })

    setTodos(updatedTodos)
  }

  const markAsEditing = id => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = true
      }

      // Because it´s a map we have to return it
      return todo
    })

    setTodos(updatedTodos)
  }

  const updateTodo = (e, id) => {
    // Find the todo with corresponding id
    // Update the description
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        // Don´t continue if input is empty string
        if (e.target.value.trim().length === 0) {
          todo.isEditing = false
          return todo
        }

        todo.title = e.target.value
        todo.isEditing = false
      }
      // Because it´s a map we have to return it
      return todo
    })

    setTodos(updatedTodos)
  }

  const cancelEdit = (e, id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = false
      }

      // Because it´s a map we have to return it
      return todo
    })

    setTodos(updatedTodos)
  }

  const remainingTodos = () => {
    //HIGHLIGHT
    return todos.filter(todo => !todo.isComplete).length
  }

  const clearCompleted = () => {
    setTodos([...todos].filter(todo => !todo.isComplete))
  }

  const completeAllTodos = () => {
    const updatedTodos = todos.map(todo => {
      todo.isComplete = true

      // Because it´s a map we have to return it
      return todo
    })
    setTodos(updatedTodos)
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />
        {todos.length > 0 ? (
          <TodoList
            todos={todos}
            completeTodo={completeTodo}
            markAsEditing={markAsEditing}
            updateTodo={updateTodo}
            cancelEdit={cancelEdit}
            deleteTodo={deleteTodo}
            remainingTodos={remainingTodos}
            clearCompleted={clearCompleted}
            completeAllTodos={completeAllTodos}
          />
        ) : (
          <NoTodos />
        )}
      </div>
    </div>
  )
}

export default App
