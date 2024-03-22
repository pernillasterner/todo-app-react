import PropTypes from 'prop-types'

export const TodoClearCompleted = props => {
  return (
    <div>
      <button onClick={props.clearCompleted} className="button">
        Clear completed
      </button>
    </div>
  )
}

TodoClearCompleted.propTypes = {
  clearCompleted: PropTypes.func.isRequired,
}
