import Button from '../../UI/Button/Button'
import './TaskFilter.css'
import useTodoActions from '../../hook/useTodoActions'
import useTodoFooter from '../../hook/useTodoFooter'

function TaskFilter() {
  const { filterTodos } = useTodoActions()
  const { filter } = useTodoFooter()

  const handleFilterClick = (typeFilter) => {
    filterTodos(typeFilter)
  }

  return (
    <ul className="filters">
      <li>
        <Button
          className={filter === 'all' ? 'selected' : undefined}
          onClick={() => handleFilterClick('all')}
        >
          All
        </Button>
      </li>
      <li>
        <Button
          className={filter === 'active' ? 'selected' : undefined}
          onClick={() => handleFilterClick('active')}
        >
          Active
        </Button>
      </li>
      <li>
        <Button
          className={filter === 'completed' ? 'selected' : undefined}
          onClick={() => handleFilterClick('completed')}
        >
          Completed
        </Button>
      </li>
    </ul>
  )
}

export default TaskFilter
