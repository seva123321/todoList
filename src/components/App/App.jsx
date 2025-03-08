import { TodoProvider } from '../../service/TodoContext'
import TaskList from '../TaskList/TaskList'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import Footer from '../Footer/Footer'
import './App.css'

function App() {
  return (
    <section className="todoapp">
      <TodoProvider>
        <NewTaskForm />
        <section className="main">
          <TaskList />
          <Footer />
        </section>
      </TodoProvider>
    </section>
  )
}

export default App
