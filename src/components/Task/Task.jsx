import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import './Task.css'

const Task = ({description, created}) => {
  return (
      <div className="view">
        <Input className="toggle" type="checkbox"/>
        <label>
          <span className="description">{description}</span>
          <span className="created">{created}</span>
        </label>
        <Button className="icon icon-edit"></Button>
        <Button className="icon icon-destroy"></Button>
      </div>
  );
};

export default Task;
