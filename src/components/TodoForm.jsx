import { useState } from 'react'
import PropTypes from 'prop-types'

export const TodoForm = props => {
  const [todoInput, setTodoInput] = useState('')

  // Function that handles icomming inputs
  const handleInput = e => {
    setTodoInput(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    // Don´t continue if input is empty string
    if (todoInput.trim().length === 0) {
      return
    }

    setTodoInput('')
    props.addTodo(todoInput)
  }

  return (
    <form action="#" onSubmit={e => handleSubmit(e)}>
      <input
        type="text"
        value={todoInput}
        onChange={e => handleInput(e)}
        className="todo-input"
        placeholder="What do you need to do?"
      />
    </form>
  )
}

TodoForm.propTypes = {
  addTodo: PropTypes.func,
}
