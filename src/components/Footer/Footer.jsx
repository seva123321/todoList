// import React from "react";
import PropTypes from "prop-types";
import TaskFilter from "../TasksFilter";
import './Footer.css'
import Button from "../../UI/Button/Button";

const Footer = ({onFilterTasks=()=>{},selected}) => {
  
  return (
    <footer className="footer">
      <span className="todo-count">1 items left</span>
      <TaskFilter onFilterTasks={onFilterTasks} selected={selected}/>
      <Button className="clear-completed">Clear completed</Button>
    </footer>
  );
};

Footer.propTypes = {
  onFilterTasks: PropTypes.func,
  selected: PropTypes.string
}

export default Footer;
