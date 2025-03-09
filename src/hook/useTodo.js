import { useContext } from 'react'

import { TodoContext } from '../service/TodoContext'

const useTodo = () => {
  const todoContext = useContext(TodoContext)
  if (!todoContext) {
    throw new Error('useTodo must be used a TodoProvider')
  }

  return todoContext
}

export default useTodo
