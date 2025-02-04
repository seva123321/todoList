import Button from "../../UI/Button/Button";
import './TaskFilter.css'

const TaskFilter =() =>{
  return (
      <ul className="filters">
        <li>
          <Button className="selected">All</Button>
        </li>
        <li>
          <Button>Active</Button>
        </li>
        <li>
          <Button>Completed</Button>
        </li>
      </ul>
  );
}

export default TaskFilter;
