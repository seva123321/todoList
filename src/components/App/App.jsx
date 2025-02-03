import TaskList from "../TaskList/TaskList";
import NewTaskForm from "../NewTaskForm";
import { formatDistanceToNow } from "date-fns";
import Footer from "../Footer";
import "./App.css";
import { useState } from "react";

const App = () => {
  const [todoData, setTodoData] = useState([
    {
      id: 1,
      description: "Completed task",
      created: `created ${formatDistanceToNow(Date.now())} ago`,
    },
    {
      id: 2,
      description: "Editing task",
      created: `created ${formatDistanceToNow(Date.now())} ago`,
    },
    {
      id: 3,
      description: "Active task",
      created: `created ${formatDistanceToNow(Date.now())} ago`,
    }, // "created 5 minutes ago"
  ]);

  // const addItem = ()=>{}
  const deleteItem = (id) => {
    setTodoData(() => {
      return todoData.filter((el) => el.id !== id);
    });
  };

  return (
    <section className="todoapp">
      <NewTaskForm />
      <section className="main">
        <TaskList todos={todoData} onDeleteItem={deleteItem} />
        <Footer />
      </section>
    </section>
  );
};

export default App;
