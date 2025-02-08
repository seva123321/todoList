import PropTypes from "prop-types";
import "./Input.css";

const Input = ({ id, className = "", ...attrs }) => {
  return <input name={id} className={className} {...attrs} />;
};

Input.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default Input;
