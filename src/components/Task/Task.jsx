import PropTypes from "prop-types";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import "./Task.css";

const Task = ({
  description,
  created='',
  checked=false,
  onDeleteItem=()=>{},
  onToggleDone=()=>{},
}) => {
  return (
    <div className="view">
      <Input
        className="toggle"
        type="checkbox"
        onChange={onToggleDone}
        checked ={checked}
      />
      <label>
        <span className="description">{description}</span>
        <span className="created">{created}</span>
      </label>
      <Button className="icon icon-edit"></Button>
      <Button className="icon icon-destroy" onClick={onDeleteItem}></Button>
    </div>
  );
};

Task.propTypes = {
  description: PropTypes.node.isRequired,
  created: PropTypes.node,
  checked: PropTypes.bool,
  onDeleteItem: PropTypes.func,
  onToggleDone: PropTypes.func,
};

export default Task;
