import PropTypes from "prop-types";
import "./Input.css";

const Input = ({ id, className="", ...attrs }) => {
  return <input name={id} className={className} {...attrs} />;
}

Input.propTypes ={
  id: PropTypes.string,
  className: PropTypes.string,
}



export default Input;
