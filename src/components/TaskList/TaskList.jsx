import './TaskList.css'
import useTodo from '../../hook/useTodo'
import Task from '../Task/Task'

function TaskList() {
  const { todos } = useTodo()

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <Task key={todo.id} {...todo} />
      ))}
    </ul>
  )
}

export default TaskList
