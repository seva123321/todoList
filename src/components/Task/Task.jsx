import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import "./Task.css";

const Task = ({
  description,
  created = "",
  checked = false,
  onDeleteItem = () => {},
  onToggleDone = () => {},
}) => {
  const [timeAgo, setTimeAgo]= useState(formatDistanceToNow(new Date(created)))
  useEffect(() => {
    const idInterval = setInterval(() => {
      setTimeAgo( formatDistanceToNow(new Date(created)));
    }, 10000);

    return ()=> clearInterval(idInterval);
  }, [created]);

  return (
    <div className="view">
      <Input
        className="toggle"
        type="checkbox"
        onChange={onToggleDone}
        checked={checked}
      />
      <label>
        <span className="description">{description}</span>
        <span className="created">{`created ${timeAgo} ago`}</span>
      </label>
      <Button className="icon icon-edit"></Button>
      <Button className="icon icon-destroy" onClick={onDeleteItem}></Button>
    </div>
  );
};

Task.propTypes = {
  description: PropTypes.node.isRequired,
  created: PropTypes.instanceOf(Date),
  checked: PropTypes.bool,
  onDeleteItem: PropTypes.func,
  onToggleDone: PropTypes.func,
};

export default Task;
