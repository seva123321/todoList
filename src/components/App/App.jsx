import TaskList from "../TaskList/TaskList";
import NewTaskForm from "../NewTaskForm";
import { formatDistanceToNow } from 'date-fns'
import Footer from "../Footer";
import "./App.css";

const App = (props) => {
  const todoData = [
    { id: 1, description: "Completed task", created: `created ${formatDistanceToNow(Date.now())} ago` },
    { id: 2, description: "Editing task", created: `created ${formatDistanceToNow(Date.now())} ago`  },
    { id: 3, description: "Active task", created: `created ${formatDistanceToNow(Date.now())} ago` },// "created 5 minutes ago"
  ];

  return (
    <section className="todoapp">
      <NewTaskForm />
      <section className="main">
        <TaskList todos={todoData} />
        <Footer />
      </section>
    </section>
  );
};

export default App;
