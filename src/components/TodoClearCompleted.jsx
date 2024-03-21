import PropTypes from 'prop-types'

export const TodoClearCompleted = props => {
  return (
    <button onClick={props.clearCompleted} className="button">
      Clear completed
    </button>
  )
}

TodoClearCompleted.propTypes = {
  clearCompleted: PropTypes.func.isRequired,
}
