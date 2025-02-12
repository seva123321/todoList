import { useState } from 'react'
import './TaskList.css'
import PropTypes from 'prop-types'

import Task from '../Task/Task'
import Input from '../../UI/Input/Input'

function TaskList({
  todos = [],
  onDeleteItem = () => {},
  onEditItem = () => {},
  onToggleDone = () => {},
}) {
  const [isEdit, setIsEdit] = useState({ edit: false, idEdit: null })
  const [label, setLabel] = useState('')

  const handleLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const handleEdit = (id, description) => {
    setIsEdit((prev) => ({ idEdit: id, edit: !prev.edit }))
    setLabel(description)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onEditItem(isEdit.idEdit, label)
    setIsEdit((prev) => ({ ...prev, edit: !prev.edit }))
  }

  const elements = todos.map((item) => {
    const { id, completed, created, description, ...itemProps } = item

    const className = completed ? 'completed' : ''

    return (
      <li
        key={id}
        className={isEdit.edit && isEdit.idEdit === id ? 'editing' : className}
      >
        <Task
          {...itemProps}
          id={id}
          created={created}
          checked={completed}
          description={description}
          onDeleteItem={() => onDeleteItem(id)}
          onToggleDone={() => onToggleDone(id)}
          onEditItem={() => handleEdit(id, description)}
        />
        {isEdit.edit && isEdit.idEdit === id && (
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              className="edit"
              onChange={handleLabelChange}
              value={label}
            />
          </form>
        )}
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
  onEditItem: PropTypes.func,
  onToggleDone: PropTypes.func,
}

export default TaskList
