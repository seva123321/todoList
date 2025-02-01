import React from "react";
import "./Input.css";

const Input = ({ id, className, ...attrs }) => {
  return <input name={id} className={className} {...attrs} />;
}

export default Input;
