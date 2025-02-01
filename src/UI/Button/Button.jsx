import React from "react";
import "./Button.css";

const Button = ({ className, children,onClick, ...attrs }) => {
  return (
    <button {...attrs} className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
