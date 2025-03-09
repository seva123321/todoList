import { useContext } from 'react'

import { FooterContext } from '../service/TodoContext'

const useTodoFooter = () => {
  const todoFooter = useContext(FooterContext)
  if (!todoFooter) {
    throw new Error('useTodoFooter must be used a FooterContextProvider')
  }

  return todoFooter
}

export default useTodoFooter
