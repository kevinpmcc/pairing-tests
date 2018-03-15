const formatSecondsToMinutes = require('./helperFunctions').formatSecondsToMinutes

class Printer {

  static printSchedule(steps) {
    let linesArray = steps.map((step, index) => {
      return Printer.standardLine(index + 1, step)
    })
    linesArray.push(Printer.finalLine(steps.length + 1, Printer.getFinalLineStartTime(steps)))
    return Printer.printOutLines(linesArray)
  }

  static printOutLines(linesArray) {
    let returnString = ''
    for(let line of linesArray) { returnString += line }
    return returnString
  }

  static standardLine(lineNumber, step) {
    return lineNumber + '. ' + formatSecondsToMinutes(step.startTime) + ' ' + step.name + ' ' + step.orderItem + ' ' + step.orderItemNumber + '\n'
  }

  static finalLine(lineNumber, seconds) {
  return lineNumber + '. ' + formatSecondsToMinutes(seconds) + ' take a break!'
  }

  static getFinalLineStartTime(steps) {
    return steps[steps.length-1].duration + steps[steps.length-1].startTime
  }
}

module.exports = Printer