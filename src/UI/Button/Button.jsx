import PropTypes from 'prop-types'
import './Button.css'

function Button({
  className = '',
  children = '',
  onClick = () => {},
  ...attrs
}) {
  return (
    <button {...attrs} type="button" className={className} onClick={onClick}>
      {children}
    </button>
  )
}

Button.propTypes = {
  className: PropTypes.node,
  children: PropTypes.node,
  onClick: PropTypes.func,
}

export default Button
