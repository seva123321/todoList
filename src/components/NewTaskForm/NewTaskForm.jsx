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
      <form onSubmit={handleSubmit}>
        <Input
          id="new-todo"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={handleLabelChange}
          value={label}
        />
      </form>
    </header>
  )
}

NewTaskForm.propTypes = { onAddItem: PropTypes.func }

export default NewTaskForm
