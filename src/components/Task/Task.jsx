import PropTypes from 'prop-types'
import { useRef } from 'react'
import { formatDistanceToNow } from 'date-fns'

import './Task.css'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'
import useTodoActions from '../../hook/useTodoActions'

function Task(props) {
  // prettier-ignore
  const {
    id,
    description,
    created,
    completed,
    timer,
    play,
    isEdit,
  } = props

  const inputEditRef = useRef(description)
  // prettier-ignore
  const {
    editTodo,
    editTodoToggle,
    toggleTodo,
    removeTodo,
    isPlayTimer,
  } = useTodoActions()

  const handleSubmit = (e) => {
    e.preventDefault()
    editTodo(id, inputEditRef.current.value)
    editTodoToggle(id)
  }

  const inputId = (description + timer).slice(0, 5) + Math.random().toFixed(3)
  const classNameLi = completed ? 'completed' : ''

  return (
    <li className={isEdit ? 'editing' : classNameLi}>
      <div className="view">
        <Input
          id={inputId}
          className="toggle"
          type="checkbox"
          onChange={() => toggleTodo(id)}
          checked={completed}
        />
        <label htmlFor={inputId}>
          <span className="title">{description}</span>
          <span className="description">
            <Button
              className={play ? 'icon icon-pause' : 'icon icon-play'}
              onClick={() => isPlayTimer(id)}
            />
            {timer}
          </span>
          <span className="created">{`created ${formatDistanceToNow(new Date(created))} ago`}</span>
        </label>
        <Button className="icon icon-edit" onClick={() => editTodoToggle(id)} />
        <Button className="icon icon-destroy" onClick={() => removeTodo(id)} />
      </div>
      {isEdit && (
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            className="edit"
            ref={inputEditRef}
            defaultValue={description}
          />
        </form>
      )}
    </li>
  )
}

Task.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  description: PropTypes.node.isRequired,
  created: PropTypes.instanceOf(Date),
  timer: PropTypes.string,
  completed: PropTypes.bool,
  play: PropTypes.bool,
  isEdit: PropTypes.bool,
}

export default Task
