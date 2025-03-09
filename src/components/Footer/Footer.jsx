import TaskFilter from '../TasksFilter/TaskFilter'
import './Footer.css'
import Button from '../../UI/Button/Button'
import useTodoFooter from '../../hook/useTodoFooter'
import useTodoActions from '../../hook/useTodoActions'

function Footer() {
  const { totalTodos } = useTodoFooter()
  const { removeAllTodo } = useTodoActions()
  return (
    <footer className="footer">
      <span className="todo-count">{`${totalTodos.toString()} items left`}</span>
      <TaskFilter />
      <Button className="clear-completed" onClick={removeAllTodo}>
        Clear completed
      </Button>
    </footer>
  )
}

export default Footer
