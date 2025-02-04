import PropTypes from "prop-types";
import "./Input.css";

const Input = ({ id, className, ...attrs }) => {
  return <input name={id} className={className} {...attrs} />;
}

Input.propTypes ={
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
}

Input.defaultProps ={
  className: '',
}

export default Input;
