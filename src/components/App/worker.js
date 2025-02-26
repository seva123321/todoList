const timers = new Map()

function timeToSeconds(time) {
  const [hours, minutes, seconds] = time.split(':').map(Number)
  return hours * 3600 + minutes * 60 + seconds
}

function secondsToTime(seconds) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

/* eslint-disable no-restricted-globals */
self.onmessage = (e) => {
  const { type, id, timer } = e.data

  switch (type) {
    case 'start': {
      if (!timers.has(id)) {
        const intervalId = setInterval(() => {
          if (timers.has(id)) {
            const { startTime, initialTime } = timers.get(id)
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000)
            const totalTime = initialTime + elapsedTime
            self.postMessage({ id, timer: secondsToTime(totalTime) })
          }
        }, 1000)

        timers.set(id, {
          startTime: Date.now(),
          initialTime: timeToSeconds(timer),
          intervalId,
        })
      }
      break
    }

    case 'stop': {
      if (timers.has(id)) {
        clearInterval(timers.get(id).intervalId)
        timers.delete(id)
      }
      break
    }

    default:
      break
  }
}
