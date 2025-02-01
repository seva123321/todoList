import Input from "../../UI/Input/Input";
import "./NewTaskForm.css";

const NewTaskForm =(props)=> {
  return (
    <header className="header">
      <h1>todos</h1>
      <Input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
      />
    </header>
  );
}

export default NewTaskForm;
