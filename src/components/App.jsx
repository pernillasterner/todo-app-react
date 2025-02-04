import '../reset.css'
import '../App.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { NoTodos } from './NoTodos'
import { TodoForm } from './TodoForm'
import { TodoList } from './TodoList'

function App() {
  const [name, setName] = useState('')
  const nameInputEl = useRef(null)
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

  // Function that calc the remaining todos. This is slow
  const remainingCalculation = () => {
    //HIGHLIGHT useMemo if something is slow
    // for (let index = 0; index < 200000000000; index++) {}
    return todos.filter(todo => !todo.isComplete).length
  }

  const remainingTodos = useMemo(remainingCalculation, [todos])

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

  // Function that handle filters
  const todosFiltered = filter => {
    if (filter === 'all') {
      return todos
    } else if (filter === 'active') {
      return todos.filter(todo => !todo.isComplete)
    } else if (filter === 'completed') {
      return todos.filter(todo => todo.isComplete)
    }
  }

  // When app mounts focus on name input
  useEffect(() => {
    nameInputEl.current.focus()

    return () => {
      console.log('cleanup ') // Run a clean up
    }
  }, [])

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <div className="name-container">
          <h2>What is your name?</h2>
          <form action="#">
            <input
              type="text"
              // HIGHLIGHT useRef(null)
              ref={nameInputEl}
              className="todo-input"
              placeholder="What is your name?"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </form>
          {name && <p className="name-label">Hello, {name}</p>}
        </div>
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
            todosFiltered={todosFiltered}
          />
        ) : (
          <NoTodos />
        )}
      </div>
    </div>
  )
}

export default App
