import { useState, useEffect, useReducer } from 'react'

import TaskList from '../TaskList/TaskList'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import Footer from '../Footer/Footer'
import {
  setNewValue,
  timeToSeconds,
  secondsToTime,
} from '../../../utils/utilsFunctions'

import './App.css'

const tasks = [
  {
    id: 1,
    description: 'Completed task',
    created: new Date(),
    timer: new Date().toLocaleTimeString(),
    play: false,
    completed: false,
  },
  {
    id: 2,
    description: 'Editing task',
    created: new Date(),
    timer: new Date().toLocaleTimeString(),
    play: false,
    completed: false,
  },
  {
    id: 3,
    description: 'Active task',
    created: new Date(),
    timer: new Date().toLocaleTimeString(),
    play: false,
    completed: false,
  },
]

function reducer(todoData, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...todoData,
        {
          id: action.id,
          description: action.description,
          created: new Date(),
          completed: false,
          play: false,
          timer: action.timer,
        },
      ]
    }

    case 'toggle_done': {
      return setNewValue(todoData, action, 'completed')
    }

    case 'isplay_timer': {
      return setNewValue(todoData, action, 'play')
    }
    case 'update_timer': {
      return setNewValue(todoData, action)
    }

    case 'edited': {
      return setNewValue(todoData, action)
    }

    case 'deleted': {
      return todoData.filter((el) => el.id !== action.id)
    }

    case 'all_deleted': {
      return []
    }

    default: {
      throw Error(`Unknown action: ${action.type}`)
    }
  }
}
function App() {
  const [todoData, dispatch] = useReducer(reducer, tasks)
  const [maxId, setMaxId] = useState(Math.max(...tasks.map((task) => task.id)))
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const idTimer = setInterval(() => {
      todoData.forEach((task) => {
        if (task.play) {
          const currentTime = timeToSeconds(task.timer) + 1
          dispatch({
            type: 'update_timer',
            id: task.id,
            timer: secondsToTime(currentTime),
          })
        }
      })
    }, 1000)

    return () => clearInterval(idTimer)
  }, [todoData])

  const handleAddItem = (form) => {
    const { title, timerMin, timerSec } = form
    const time = secondsToTime(+timerMin * 60 + +timerSec)

    dispatch({
      type: 'added',
      id: maxId + 1,
      description: title,
      timer: time,
    })
    setMaxId((prevMaxId) => prevMaxId + 1)
  }

  const handleDeleteItem = (id) => {
    dispatch({
      type: 'deleted',
      id,
    })
  }

  const handleEditItem = (id, description) => {
    dispatch({
      type: 'edited',
      id,
      description,
    })
  }

  const handleDeleteAllItems = () => {
    dispatch({ type: 'all_deleted' })
  }

  const handleToggleDone = (id) => {
    dispatch({
      type: 'toggle_done',
      id,
    })
  }

  const handleWorkTimer = (id) => {
    dispatch({
      type: 'isplay_timer',
      id,
    })
  }

  const handleFilterTasks = (text) => {
    setFilter(text)
  }

  // Фильтрация задач в зависимости от текущего фильтра
  const filteredTasks = () => {
    switch (filter) {
      case 'active': {
        return todoData.filter((item) => !item.completed)
      }
      case 'completed': {
        return todoData.filter((item) => item.completed)
      }
      default: {
        return todoData
      }
    }
  }

  const todoCount = todoData.filter((item) => !item.completed).length

  return (
    <section className="todoapp">
      <NewTaskForm onAddItem={handleAddItem} />
      <section className="main">
        <TaskList
          todos={filteredTasks()}
          onDeleteItem={handleDeleteItem}
          onToggleDone={handleToggleDone}
          onEditItem={handleEditItem}
          onWorkTimer={handleWorkTimer}
        />
        <Footer
          todoCount={todoCount}
          selected={filter}
          onDeleteAllItems={handleDeleteAllItems}
          onFilterTasks={handleFilterTasks}
        />
      </section>
    </section>
  )
}

export default App
