function setNewValue(data, action, fieldBool) {
  const { id, ...args } = action

  const index = data.findIndex((item) => item.id === id)
  const oldItem = data[index]

  const newItem = fieldBool
    ? { ...oldItem, [fieldBool]: !oldItem[fieldBool] }
    : { ...oldItem, ...args }

  return [...data.slice(0, index), newItem, ...data.slice(index + 1)]
}

function timeToSeconds(time) {
  const [hours, minutes, seconds] = time.split(':').map(Number)
  return hours * 3600 + minutes * 60 + seconds
}

function secondsToTime(seconds) {
  if (Number.isNaN(seconds) || seconds < 0) {
    return '00:00:00'
  }

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

export { setNewValue, timeToSeconds, secondsToTime }
