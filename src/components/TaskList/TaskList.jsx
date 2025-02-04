import "./TaskList.css";
import Task from "../Task";
import { useState } from "react";
import PropTypes from "prop-types";

const TaskList = ({ todos = [], onDeleteItem = () => {} }) => {
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleCheckComplite = (idItem, completed) => {
    setCompletedTasks((prev) => {
      if (!completed) {
        // Если задача не завершена, удаляем её из массива
        return prev.filter((id) => id !== idItem);
      }
      // Если задача завершена, добавляем её в массив
      return [...prev, idItem];
    });
  };

  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    const isCompleted = completedTasks.includes(id); 
    return (
      <li key={id} className={isCompleted ? "completed" : undefined}>
        <Task
          {...itemProps}
          id={id}
          onDeleteItem={onDeleteItem}
          onComplite={handleCheckComplite}
          completed={isCompleted} 
        />
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
      created: PropTypes.string,
    })
  ),
  onDeleteItem: PropTypes.func,
};

export default TaskList;