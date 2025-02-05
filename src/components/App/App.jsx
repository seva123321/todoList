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
      completed: false,
    },
    {
      id: 2,
      description: "Editing task",
      created: `created ${formatDistanceToNow(Date.now())} ago`,
      completed: false,
    },
    {
      id: 3,
      description: "Active task",
      created: `created ${formatDistanceToNow(Date.now())} ago`,
      completed: false,
    }, // "created 5 minutes ago"
  ]);

  // const addItem = ()=>{}
  const deleteItem = (id) => {
    setTodoData(() => {
      return todoData.filter((el) => el.id !== id);
    });
  };

  const onToggleDone = (id) => {
    const index = todoData.findIndex((item) => item.id === id);

    const oldItem = todoData[index];
    const newItem = { ...oldItem, completed: !oldItem.completed };

    setTodoData(() => {
      return [
        ...todoData.slice(0, index),
        newItem,
        ...todoData.slice(index + 1),
      ];
    });
  };

  return (
    <section className="todoapp">
      <NewTaskForm />
      <section className="main">
        <TaskList
          todos={todoData}
          onDeleteItem={deleteItem}
          onToggleDone={onToggleDone}
        />
        <Footer />
      </section>
    </section>
  );
};

export default App;
