import PropTypes from 'prop-types'
import { TodoItemsRemaining } from './TodoItemsRemaining'
import { TodoClearCompleted } from './TodoClearCompleted'
import { TodoCompleteAll } from './TodoCompleteAll'

export const TodoList = props => {
  return (
    <>
      <ul className="todo-list">
        {props.todos.map((todo, index) => (
          <li key={todo.id} className="todo-item-container">
            <div className="todo-item">
              <input
                type="checkbox"
                onChange={() => props.completeTodo(todo.id)}
                checked={todo.isComplete ? true : false}
              />
              {!todo.isEditing ? (
                <span
                  onDoubleClick={() => props.markAsEditing(todo.id)}
                  className={`todo-item-label ${
                    todo.isComplete ? 'line-through' : ''
                  }`}
                >
                  {todo.title}
                </span>
              ) : (
                <input
                  type="text"
                  onBlur={e => props.updateTodo(e, todo.id)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      props.updateTodo(e, todo.id)
                    } else if (e.key === 'Escape') {
                      props.cancelEdit(e, todo.id)
                    }
                  }}
                  className="todo-item-input"
                  defaultValue={todo.title}
                  autoFocus
                />
              )}
            </div>
            <button
              onClick={() => props.deleteTodo(todo.id)}
              className="x-button"
            >
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
        <TodoCompleteAll completeAllTodos={props.completeAllTodos} />

        <TodoItemsRemaining remainingTodos={props.remainingTodos} />
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
          <TodoClearCompleted clearCompleted={props.clearCompleted} />
        </div>
      </div>
    </>
  )
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  completeTodo: PropTypes.func.isRequired,
  markAsEditing: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  remainingTodos: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  completeAllTodos: PropTypes.func.isRequired,
}
