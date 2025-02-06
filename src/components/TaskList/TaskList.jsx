import "./TaskList.css";
import Task from "../Task";
import PropTypes from "prop-types";

const TaskList = ({
  todos = [],
  onDeleteItem = () => {},
  onToggleDone = () => {},
}) => {
  const elements = todos.map((item) => {
    const { id, completed, ...itemProps } = item;

    const className = completed ? "completed" : undefined;
    
    return (
      <li key={id} className={className}>
        <Task
          {...itemProps}
          id={id}
          checked={completed}
          onDeleteItem={() => onDeleteItem(id)}
          onToggleDone={() => onToggleDone(id)}
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
  onToggleDone: PropTypes.func,
};

export default TaskList;
