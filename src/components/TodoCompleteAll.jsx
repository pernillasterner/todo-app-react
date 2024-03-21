import PropTypes from 'prop-types'

export const TodoCompleteAll = props => {
  return (
    <div>
      <div onClick={props.completeAllTodos} className="button">
        Check All
      </div>
    </div>
  )
}

TodoCompleteAll.propTypes = {
  completeAllTodos: PropTypes.func.isRequired,
}
