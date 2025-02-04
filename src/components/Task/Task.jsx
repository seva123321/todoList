import { useState } from "react";
import PropTypes from "prop-types";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import "./Task.css";

const Task = ({ id, description, created, onDeleteItem, onComplite }) => {
  const [completed, setCompleted] = useState(false);

  const handleChange = () => {
    const newCompleted = !completed;
    setCompleted(newCompleted);
    onComplite(id, newCompleted);
  };

  return (
    <div className="view">
      <Input
        onChange={handleChange}
        className="toggle"
        type="checkbox"
        checked={completed}
      />
      <label>
        <span className="description">{description}</span>
        <span className="created">{created}</span>
      </label>
      <Button className="icon icon-edit"></Button>
      <Button
        className="icon icon-destroy"
        onClick={() => onDeleteItem(id)}
      ></Button>
    </div>
  );
};

Task.propTypes = {
  id: PropTypes.number,
  description: PropTypes.string,
  created: PropTypes.string,
  onDeleteItem: PropTypes.func,
  onComplite: PropTypes.func,
};

export default Task;
