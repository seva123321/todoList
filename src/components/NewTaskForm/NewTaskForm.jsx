import PropTypes from "prop-types";
import Input from "../../UI/Input/Input";
import "./NewTaskForm.css";
import { useState } from "react";

const NewTaskForm = ({ onAddItem }) => {
  const [label, setLabel] = useState("");

  const handleSubmit = (e)=> {
    e.preventDefault()
    onAddItem(label)
  }

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form    onSubmit={handleSubmit}>
        <Input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={handleLabelChange}
          value={label}
        />
      </form>
    </header>
  );
};

NewTaskForm.propTypes = {
  onAddItem: PropTypes.func,
};

export default NewTaskForm;
