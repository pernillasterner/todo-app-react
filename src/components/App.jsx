import '../reset.css'
import '../App.css'
import { useState } from 'react'

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

  const [todoInput, setTodoInput] = useState('')
  const [idForTodo, setIdForTodo] = useState(4)

  // Function that adds new tasks
  const addTodo = e => {
    e.preventDefault()

    // Don´t continue if input is empty string
    if (todoInput.trim().length === 0) {
      return
    }

    // Copy array and add a new task
    setTodos([
      ...todos,
      {
        id: idForTodo,
        title: todoInput,
        isComplete: false,
      },
    ])

    setTodoInput('')
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

  // Function that handles icomming inputs
  const handleInput = e => {
    setTodoInput(e.target.value)
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <form action="#" onSubmit={addTodo}>
          <input
            type="text"
            value={todoInput}
            onChange={e => handleInput(e)}
            className="todo-input"
            placeholder="What do you need to do?"
          />
        </form>

        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={todo.id} className="todo-item-container">
              <div className="todo-item">
                <input
                  type="checkbox"
                  onChange={() => completeTodo(todo.id)}
                  checked={todo.isComplete ? true : false}
                />
                {!todo.isEditing ? (
                  <span
                    onDoubleClick={() => markAsEditing(todo.id)}
                    className={`todo-item-label ${
                      todo.isComplete ? 'line-through' : ''
                    }`}
                  >
                    {todo.title}
                  </span>
                ) : (
                  <input
                    type="text"
                    onBlur={e => updateTodo(e, todo.id)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        updateTodo(e, todo.id)
                      } else if (e.key === 'Escape') {
                        cancelEdit(e, todo.id)
                      }
                    }}
                    className="todo-item-input"
                    defaultValue={todo.title}
                    autoFocus
                  />
                )}
              </div>
              <button onClick={() => deleteTodo(todo.id)} className="x-button">
                <svg
                  className="x-button-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        <div className="check-all-container">
          <div>
            <div className="button">Check All</div>
          </div>

          <span>3 items remaining</span>
        </div>

        <div className="other-buttons-container">
          <div>
            <button className="button filter-button filter-button-active">
              All
            </button>
            <button className="button filter-button">Active</button>
            <button className="button filter-button">Completed</button>
          </div>
          <div>
            <button className="button">Clear completed</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
