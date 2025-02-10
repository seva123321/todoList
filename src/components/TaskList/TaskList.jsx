import './TaskList.css'
import PropTypes from 'prop-types'

import Task from '../Task/Task'

function TaskList({
  todos = [],
  onDeleteItem = () => {},
  onToggleDone = () => {},
}) {
  const elements = todos.map((item) => {
    const { id, completed, created, ...itemProps } = item

    const className = completed ? 'completed' : undefined

    return (
      <li key={id} className={className}>
        <Task
          {...itemProps}
          id={id}
          created={created}
          checked={completed}
          onDeleteItem={() => onDeleteItem(id)}
          onToggleDone={() => onToggleDone(id)}
        />
      </li>
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
      created: PropTypes.instanceOf(Date),
    })
  ),
  onDeleteItem: PropTypes.func,
  onToggleDone: PropTypes.func,
}

export default TaskList
