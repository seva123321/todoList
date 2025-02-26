import { useState, useRef, useEffect, useReducer } from 'react'

import TaskList from '../TaskList/TaskList'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import Footer from '../Footer/Footer'
import { setNewValue, secondsToTime } from '../../../utils/utilsFunctions'
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
    case 'added':
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
    case 'toggle_done':
      return setNewValue(todoData, action, 'completed')
    case 'isplay_timer':
      return setNewValue(todoData, action, 'play')
    case 'update_timer':
      return setNewValue(todoData, action)
    case 'edited':
      return setNewValue(todoData, action)
    case 'deleted':
      return todoData.filter((el) => el.id !== action.id)
    case 'all_deleted':
      return []
    default:
      throw Error(`Unknown action: ${action.type}`)
  }
}

function App() {
  const [todoData, dispatch] = useReducer(reducer, tasks)
  const [maxId, setMaxId] = useState(Math.max(...tasks.map((task) => task.id)))
  const [filter, setFilter] = useState('all')
  const workerRef = useRef(null)

  useEffect(() => {
    workerRef.current = new Worker(new URL('./worker.js', import.meta.url))

    workerRef.current.onmessage = (e) => {
      const { id, timer } = e.data
      dispatch({
        type: 'update_timer',
        id,
        timer,
      })
    }

    return () => workerRef.current.terminate()
  }, [])

  useEffect(() => {
    todoData.forEach((task) => {
      if (task.play) {
        workerRef.current.postMessage({
          type: 'start',
          id: task.id,
          timer: task.timer,
        })
      }
    })
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
    workerRef.current.postMessage({ type: 'stop', id })
    dispatch({
      type: 'deleted',
      id,
    })
  }

  const handleDeleteAllItems = () => {
    todoData.forEach((task) => {
      if (task.play) {
        workerRef.current.postMessage({ type: 'stop', id: task.id })
      }
    })
    dispatch({ type: 'all_deleted' })
  }

  const handleWorkTimer = (id) => {
    const task = todoData.find((item) => item.id === id)
    if (task) {
      workerRef.current.postMessage({
        type: task.play ? 'stop' : 'start',
        id,
        timer: task.timer,
      })
      dispatch({
        type: 'isplay_timer',
        id,
      })
    }
  }

  const handleToggleDone = (id) => {
    dispatch({
      type: 'toggle_done',
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

  const handleFilterTasks = (text) => {
    setFilter(text)
  }

  const filteredTasks = () => {
    switch (filter) {
      case 'active':
        return todoData.filter((item) => !item.completed)
      case 'completed':
        return todoData.filter((item) => item.completed)
      default:
        return todoData
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
