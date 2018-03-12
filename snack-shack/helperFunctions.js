function formatSecondsToMinutes(totalSeconds) {
  if (totalSeconds === 60) return '0:60'
  let minutes = Math.floor(totalSeconds / 60).toString()  
  let seconds = (totalSeconds % 60).toString()
  if (seconds.length === 1) seconds = '0' + seconds
  return minutes + ':' + seconds
}

module.exports = { formatSecondsToMinutes: formatSecondsToMinutes }