const formatSecondsToMinutes = require('./helperFunctions').formatSecondsToMinutes


  function printSchedule(steps) {
    let linesArray = steps.map((step, index) => {
      return standardLine(index + 1, step)
    })
    linesArray.push(finalLine(steps.length + 1, getFinalLineStartTime(steps)))
    return printOutLines(linesArray)
  }

  function printOutLines(linesArray) {
    let returnString = ''
    for(let line of linesArray) { returnString += line }
    return returnString
  }

  function standardLine(lineNumber, step) {
    return lineNumber + '. ' + formatSecondsToMinutes(step.startTime) + ' ' + step.name + ' ' + step.orderItem + ' ' + step.orderItemNumber + '\n'
  }

  function finalLine(lineNumber, seconds) {
  return lineNumber + '. ' + formatSecondsToMinutes(seconds) + ' take a break!'
  }

  function getFinalLineStartTime(steps) {
    return steps[steps.length-1].duration + steps[steps.length-1].startTime
  }

module.exports = printSchedule;
