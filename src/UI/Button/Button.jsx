import PropTypes from "prop-types";
import "./Button.css";

const Button = ({ className, children, onClick, ...attrs }) => {
  return (
    <button {...attrs} className={className} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.node,
  children: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  className: '',
  children:'Кнопка',
  onClick: ()=>{}
}

export default Button;
