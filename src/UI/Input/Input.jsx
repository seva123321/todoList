import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import './Input.css'

const Input = forwardRef((props, ref) => {
  const { id, className = '', ...attrs } = props
  return <input id={id} className={className} {...attrs} ref={ref} />
})

Input.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  type: PropTypes.string,
}

export default Input
