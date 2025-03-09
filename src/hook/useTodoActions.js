import { useContext } from 'react'

import { TodoContextActions } from '../service/TodoContext'

const useTodoActions = () => {
  const todoContextActions = useContext(TodoContextActions)
  if (!todoContextActions) {
    throw new Error('useTodoActions must be used a TodoContextActionsProvider')
  }

  return todoContextActions
}
export default useTodoActions
