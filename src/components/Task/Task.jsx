import { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'
import './Task.css'

function Task({
  description,
  timer = '00:00:00',
  play = false,
  created = '',
  checked = false,
  onDeleteItem = () => {},
  onToggleDone = () => {},
  onEditItem = () => {},
  onWorkTimer = () => {},
}) {
  const [timeAgo, setTimeAgo] = useState(formatDistanceToNow(new Date(created)))

  useEffect(() => {
    const idInterval = setInterval(() => {
      setTimeAgo(formatDistanceToNow(new Date(created)))
    }, 30_000)

    return () => clearInterval(idInterval)
  }, [created])

  const inputId = description.slice(0, 5) + Math.random().toFixed(3)

  return (
    <div className="view">
      <Input
        id={inputId}
        className="toggle"
        type="checkbox"
        onChange={onToggleDone}
        checked={checked}
      />
      <label htmlFor={inputId}>
        <span className="title">{description}</span>
        <span className="description">
          <Button
            className={play ? 'icon icon-pause' : 'icon icon-play'}
            onClick={onWorkTimer}
          />
          {/* <Button className="icon icon-play" onClick={onWorkTimer} />
          <Button className="icon icon-pause" onClick={onWorkTimer} /> */}
          {timer}
        </span>
        <span className="created">{`created ${timeAgo} ago`}</span>
      </label>
      <Button className="icon icon-edit" onClick={onEditItem} />
      <Button className="icon icon-destroy" onClick={onDeleteItem} />
    </div>
  )
}

Task.propTypes = {
  // id: PropTypes.number.isRequired,
  description: PropTypes.node.isRequired,
  created: PropTypes.instanceOf(Date),
  timer: PropTypes.string,
  checked: PropTypes.bool,
  onDeleteItem: PropTypes.func,
  onToggleDone: PropTypes.func,
  onEditItem: PropTypes.func,
}

export default Task
