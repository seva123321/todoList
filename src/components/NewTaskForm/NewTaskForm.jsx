import { useState } from 'react'

import Input from '../../UI/Input/Input'
import { secondsToTime } from '../../../utils/utilsFunctions'
import './NewTaskForm.css'
import useTodoActions from '../../hook/useTodoActions'

const defaultForm = {
  title: '',
  timerMin: '',
  timerSec: '',
}

function NewTaskForm() {
  const [form, setForm] = useState(defaultForm)
  const { addTodo } = useTodoActions()

  const handleSubmit = (e) => {
    e.preventDefault()
    const { title, timerMin, timerSec } = form
    const time = secondsToTime(+timerMin * 60 + +timerSec)

    addTodo(title, time)
    setForm(defaultForm)
  }

  const handleformChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const { title, timerMin, timerSec } = form

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={handleSubmit}>
        <Input
          id="new-todo"
          name="title"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          required
          value={title}
          onChange={handleformChange}
        />
        <Input
          className="new-todo-form__timer"
          name="timerMin"
          placeholder="Min"
          autoFocus
          type="number"
          value={timerMin}
          onChange={handleformChange}
        />
        <Input
          className="new-todo-form__timer"
          name="timerSec"
          placeholder="Sec"
          autoFocus
          type="number"
          value={timerSec}
          onChange={handleformChange}
        />
        <button
          type="submit"
          style={{ display: 'none' }}
          aria-label="Submit form"
        />
      </form>
    </header>
  )
}

export default NewTaskForm
