import TaskList from "../TaskList/TaskList";
import NewTaskForm from "../NewTaskForm";
import { formatDistanceToNow } from "date-fns";
import Footer from "../Footer";
import "./App.css";
import { useState } from "react";

const tasks = [
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
  },
];

const App = () => {
  const [todoData, setTodoData] = useState(tasks);
  const [maxId, setMaxId] = useState([...tasks].sort((a, b) => a.id - b.id).at(-1).id);// useState(3);
  const [filter, setFilter] = useState("all"); // Состояние для текущего фильтра

  const handleAddItem = (label) => {
    const newItem = {
      id: maxId + 1,
      description: label,
      created: `created ${formatDistanceToNow(Date.now())} ago`,
      completed: false,
    };

    setTodoData((prevData) => [...prevData, newItem]);
    setMaxId((prevMaxId) => prevMaxId + 1);
  };

  const handleDeleteItem = (id) => {
    setTodoData((prevData) => prevData.filter((el) => el.id !== id));
  };

  const handleToggleDone = (id) => {
    setTodoData((prevData) => {
      const index = prevData.findIndex((item) => item.id === id);
      const oldItem = prevData[index];
      const newItem = { ...oldItem, completed: !oldItem.completed };

      return [
        ...prevData.slice(0, index),
        newItem,
        ...prevData.slice(index + 1),
      ];
    });
  };

  const handleFilterTasks = (text) => {
    setFilter(text); // Устанавливаем текущий фильтр
  };

  // Фильтрация задач в зависимости от текущего фильтра
  const filteredTasks = () => {
    switch (filter) {
      case "active":
        return todoData.filter((item) => !item.completed);
      case "completed":
        return todoData.filter((item) => item.completed);
      default:
        return todoData; // Все задачи
    }
  };
  return (
    <section className="todoapp">
      <NewTaskForm onAddItem={handleAddItem} />
      <section className="main">
        <TaskList
          todos={filteredTasks()}
          onDeleteItem={handleDeleteItem}
          onToggleDone={handleToggleDone}
        />
        <Footer onFilterTasks={handleFilterTasks} selected={filter} />
      </section>
    </section>
  );
};

export default App;
