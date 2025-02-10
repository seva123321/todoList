import { useState, useReducer } from 'react'

import TaskList from '../TaskList/TaskList'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import Footer from '../Footer/Footer'

import './App.css'

const tasks = [
  {
    id: 1,
    description: 'Completed task',
    created: new Date(),
    completed: false,
  },
  {
    id: 2,
    description: 'Editing task',
    created: new Date(),

    completed: false,
  },
  {
    id: 3,
    description: 'Active task',
    created: new Date(),

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
        },
      ]
    }

    case 'toggle_done': {
      const index = todoData.findIndex((item) => item.id === action.id)
      const oldItem = todoData[index]
      const newItem = { ...oldItem, completed: !oldItem.completed }

      return [
        ...todoData.slice(0, index),
        newItem,
        ...todoData.slice(index + 1),
      ]
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
  const [maxId, setMaxId] = useState(
    [...tasks].sort((a, b) => a.id - b.id).at(-1).id
  ) // useState(3)
  const [filter, setFilter] = useState('all')

  const handleAddItem = (label) => {
    dispatch({
      type: 'added',
      id: maxId + 1,
      description: label,
    })
    setMaxId((prevMaxId) => prevMaxId + 1)
  }

  const handleDeleteItem = (id) => {
    dispatch({
      type: 'deleted',
      id,
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
