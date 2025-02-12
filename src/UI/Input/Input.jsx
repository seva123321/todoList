import PropTypes from 'prop-types'
import './Input.css'

function Input({ id, className = '', ...attrs }) {
  return <input id={id} className={className} {...attrs} />
}

Input.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
}

export default Input
