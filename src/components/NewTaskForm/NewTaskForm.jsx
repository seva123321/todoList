import { useState } from 'react'
import PropTypes from 'prop-types'

import Input from '../../UI/Input/Input'

import './NewTaskForm.css'

const defaultForm = {
  title: '',
  timerMin: '',
  timerSec: '',
}

function NewTaskForm({ onAddItem }) {
  const [form, setForm] = useState(defaultForm)

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddItem(form)
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

NewTaskForm.propTypes = { onAddItem: PropTypes.func }

export default NewTaskForm

// import { useState } from 'react'
// import PropTypes from 'prop-types'

// import Input from '../../UI/Input/Input'

// import './NewTaskForm.css'

// function NewTaskForm({ onAddItem }) {
//   const [form, setForm] = useState({
//     title: '',
//     timerMin: '',
//     timerSec: '',
//   })

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       event.preventDefault()
//       console.log('press')

//       // onSubmit(event);  //ваша функция отправки
//     }
//   }

//   const onSubmit = (e) => {
//     e.preventDefault()
//     onAddItem(form)
//     setForm('')
//   }

//   const handleformChange = (e) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
//   }

//   const { title, timerMin, timerSec } = form

//   return (
//     <header className="header">
//       <h1>todos</h1>
//       <form
//         className="new-todo-form"
//         onSubmit={onSubmit}
//         onKeyDown={handleKeyPress}
//       >
//         <Input
//           id="new-todo"
//           name="title"
//           className="new-todo"
//           placeholder="What needs to be done?"
//           autoFocus
//           value={title}
//           onChange={handleformChange}
//         />
//         <Input
//           className="new-todo-form__timer"
//           name="timerMin"
//           placeholder="Min"
//           autoFocus
//           type="number"
//           value={timerMin}
//           onChange={handleformChange}
//         />
//         <Input
//           className="new-todo-form__timer"
//           name="timerSec"
//           placeholder="Sec"
//           autoFocus
//           type="number"
//           value={timerSec}
//           onChange={handleformChange}
//         />
//       </form>
//     </header>
//   )
// }

// NewTaskForm.propTypes = { onAddItem: PropTypes.func }

// export default NewTaskForm
