import { useState } from 'react'
import PropTypes from 'prop-types'

import Input from '../../UI/Input/Input'

import './NewTaskForm.css'

function NewTaskForm({ onAddItem }) {
  const [label, setLabel] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddItem(label)
    setLabel('')
  }

  const handleLabelChange = (e) => {
    setLabel(e.target.value)
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={handleSubmit}>
        <Input
          id="new-todo"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={handleLabelChange}
          value={label}
        />
        <Input className="new-todo-form__timer" placeholder="Min" autoFocus />
        <Input className="new-todo-form__timer" placeholder="Sec" autoFocus />
      </form>
    </header>
  )
}

NewTaskForm.propTypes = { onAddItem: PropTypes.func }

export default NewTaskForm
