import PropTypes from 'prop-types'

import TaskFilter from '../TasksFilter/TaskFilter'
import './Footer.css'
import Button from '../../UI/Button/Button'

function Footer({
  todoCount = 0,
  onDeleteAllItems = () => {},
  onFilterTasks = () => {},
  selected,
}) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {todoCount.toString()}
        items left
      </span>
      <TaskFilter onFilterTasks={onFilterTasks} selected={selected} />
      <Button className="clear-completed" onClick={onDeleteAllItems}>
        Clear completed
      </Button>
    </footer>
  )
}

Footer.propTypes = {
  todoCount: PropTypes.number,
  selected: PropTypes.oneOf(['all', 'active', 'completed']),
  onDeleteAllItems: PropTypes.func,
  onFilterTasks: PropTypes.func,
}

export default Footer
