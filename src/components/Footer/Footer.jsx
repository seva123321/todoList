// import React from "react";
import TaskFilter from "../TasksFilter";
import './Footer.css'
import Button from "../../UI/Button/Button";

const Footer = () => {
  return (
    <footer className="footer">
      <span className="todo-count">1 items left</span>
      <TaskFilter />
      <Button className="clear-completed">Clear completed</Button>
    </footer>
  );
};

export default Footer;
