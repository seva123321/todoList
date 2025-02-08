import PropTypes from "prop-types";
import Button from "../../UI/Button/Button";
import "./TaskFilter.css";

const TaskFilter = ({ onFilterTasks, selected }) => {
  return (
    <ul className="filters">
      <li>
        <Button
          className={selected === "all" ? "selected" : undefined}
          onClick={() => onFilterTasks("all")}
        >
          All
        </Button>
      </li>
      <li>
        <Button
          className={selected === "active" ? "selected" : undefined}
          onClick={() => onFilterTasks("active")}
        >
          Active
        </Button>
      </li>
      <li>
        <Button
          className={selected === "completed" ? "selected" : undefined}
          onClick={() => onFilterTasks("completed")}
        >
          Completed
        </Button>
      </li>
    </ul>
  );
};

TaskFilter.propTypes = {
  selected: PropTypes.oneOf(["all", "active", "completed"]),
  onFilterTasks: PropTypes.func,
};

export default TaskFilter;
