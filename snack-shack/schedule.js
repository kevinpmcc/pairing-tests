const formatSecondsToMinutes = require('./helperFunctions').formatSecondsToMinutes
const createStep = require('./step.js')


class Schedule {
  constructor(timings) {
    this.timings = timings
  }

  getSchedule(orders) {
    let steps = this.createSteps(orders)
    let linesArray = steps.map((step, index) => {
      return Schedule.standardLine(index + 1, step)
    })
    linesArray.push(Schedule.finalLine(steps.length + 1, Schedule.getFinalLineStartTime(steps)))
    return Schedule.printOutLines(linesArray)
  }

  createSteps(orders) {
    let flattenedSteps = Array.prototype.concat(...this.createUnflattenedSteps(orders))
    return Schedule.addStartTimeToSteps(flattenedSteps)
  }

  createUnflattenedSteps(orders) {
    return orders.map((order, orderIndex) => { 
        return this.filterTimingsForOrderItem(order.orderItem).map((step, stepIndex) => {
          return createStep({ name: step.name, orderItem: order.orderItem, duration: step.duration, startTime: '', orderItemNumber: (orderIndex + 1)})
        })
      })
  }

  filterTimingsForOrderItem(currentOrderItem) {
    return this.timings.orderItems.filter((orderItem => orderItem.name === currentOrderItem))[0].steps
  }

  static addStartTimeToSteps(flattenedSteps) {
    return flattenedSteps.map((flattenedStep, index) => {
        if (index === 0 ) flattenedStep.startTime = 0
        if (index !== 0) flattenedStep.startTime = Schedule.getDurationOfAllPreviousSteps(flattenedSteps, index)
        return flattenedStep
    })
  }

  static getDurationOfAllPreviousSteps(flattenedSteps, index) {
    let relevantSteps = flattenedSteps.slice(0, index)
    return relevantSteps.reduce((a, b) => ({ duration: a.duration + b.duration  })).duration
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


module.exports = { Schedule: Schedule }



