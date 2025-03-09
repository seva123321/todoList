import {
  createContext,
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react'

import { setNewValue } from '../../utils/utilsFunctions'

export const TodoContext = createContext(null)
export const TodoContextActions = createContext(null)
export const FooterContext = createContext(null)
export const initialState = [
  {
    id: 1,
    description: 'Completed task',
    created: new Date(),
    timer: new Date().toLocaleTimeString(),
    play: false,
    completed: true,
    isEdit: false,
  },
  {
    id: 2,
    description: 'Editing task',
    created: new Date(),
    timer: new Date().toLocaleTimeString(),
    play: false,
    completed: false,
    isEdit: false,
  },
  {
    id: 3,
    description: 'Active task',
    created: new Date(),
    timer: new Date().toLocaleTimeString(),
    play: false,
    completed: false,
    isEdit: false,
  },
]

export function TodoProvider({ children }) {
  const [todosData, setTodosData] = useState(initialState)
  const [filter, setFilter] = useState('all')
  const [maxId, setMaxId] = useState(
    Math.max(...initialState.map((task) => task.id))
  )
  const workerRef = useRef(null)

  const updateTimer = useCallback((id, timer) => {
    setTodosData((prev) => setNewValue(prev, { id, timer }))
  }, [])

  useEffect(() => {
    workerRef.current = new Worker(new URL('./worker.js', import.meta.url))

    workerRef.current.onmessage = (e) => {
      const { id, timer } = e.data
      updateTimer(id, timer)
    }

    return () => workerRef.current.terminate()
  }, [updateTimer])

  useEffect(() => {
    todosData.forEach((todo) => {
      if (todo.play) {
        workerRef.current.postMessage({
          type: 'start',
          id: todo.id,
          timer: todo.timer,
        })
      }
    })
  }, [todosData])

  const addTodo = useCallback(
    (description, timer) => {
      setTodosData((prev) => [
        ...prev,
        {
          id: maxId + 1,
          description,
          created: new Date(),
          completed: false,
          play: false,
          timer,
        },
      ])
      setMaxId((prevMaxId) => prevMaxId + 1)
    },
    [maxId]
  )

  const removeTodo = useCallback((id) => {
    workerRef.current.postMessage({ type: 'stop', id })
    setTodosData((prev) => prev.filter((el) => el.id !== id))
  }, [])

  const removeAllTodo = useCallback(() => {
    setTodosData([])
  }, [])

  const editTodo = useCallback((id, description) => {
    setTodosData((prev) => setNewValue(prev, { id, description }))
  }, [])

  const editTodoToggle = useCallback((id) => {
    setTodosData((prev) => setNewValue(prev, { id }, 'isEdit'))
  }, [])

  const isPlayTimer = useCallback((id) => {
    setTodosData((prev) => {
      const task = prev.find((item) => item.id === id)
      if (task && !task.completed) {
        workerRef.current.postMessage({
          type: task.play ? 'stop' : 'start',
          id,
          timer: task.timer,
        })
        return setNewValue(prev, { id }, 'play')
      }
      return prev
    })
  }, [])

  const toggleTodo = useCallback((id) => {
    setTodosData((prev) => {
      const task = prev.find((item) => item.id === id)
      if (task && task.play) {
        workerRef.current.postMessage({ type: 'stop', id })
      }
      return setNewValue(prev, { id }, 'completed')
    })
  }, [])

  const filterTodos = useCallback((typeFilter) => {
    setFilter(() => typeFilter)
  }, [])

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return todosData.filter((item) => !item.completed)
      case 'completed':
        return todosData.filter((item) => item.completed)
      default:
        return todosData
    }
  }, [todosData, filter])

  const totalTodos = useMemo(
    () => todosData.filter((item) => !item.completed).length,
    [todosData]
  )

  const todoContextValue = useMemo(
    () => ({ todos: filteredTasks }),
    [filteredTasks]
  )

  const footerContextValue = useMemo(
    () => ({
      totalTodos,
      filter,
    }),
    [totalTodos, filter]
  )

  const actions = useMemo(
    () => ({
      addTodo,
      editTodo,
      editTodoToggle,
      toggleTodo,
      removeTodo,
      removeAllTodo,
      updateTimer,
      isPlayTimer,
      filterTodos,
    }),
    [
      addTodo,
      editTodo,
      editTodoToggle,
      toggleTodo,
      removeTodo,
      removeAllTodo,
      updateTimer,
      isPlayTimer,
      filterTodos,
    ]
  )

  return (
    <TodoContext.Provider value={todoContextValue}>
      <TodoContextActions.Provider value={actions}>
        <FooterContext.Provider value={footerContextValue}>
          {children}
        </FooterContext.Provider>
      </TodoContextActions.Provider>
    </TodoContext.Provider>
  )
}
