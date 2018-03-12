const formatSecondsToMinutes = require('./helperFunctions').formatSecondsToMinutes
const createStep = require('./step.js')
const timings = require('./foodTimings')

class Schedule {

  getSchedule(orders) {
    let schedule = ''
    let lineNumber = 1
    let seconds = 0
    let steps = this.createSteps(orders)

    for (let i = 0; i < steps.length; i++) {
      let step = steps[i]
      schedule += Schedule.standardLine(lineNumber, seconds, step)
      lineNumber ++
      seconds += step.duration
    }
    schedule += Schedule.finalLine(lineNumber, seconds)
    return schedule
  }

  static standardLine(lineNumber, seconds, step) {
    return lineNumber + '. ' + formatSecondsToMinutes(seconds) + ' ' + step.name + ' ' + step.foodType + ' ' + step.orderItemNumber + '\n'
  }

  static finalLine(lineNumber, seconds) {
    return lineNumber + '. ' + formatSecondsToMinutes(seconds) + ' take a break!'
  }

  createSteps(orders) {
    return Array.prototype.concat(...orders.map((order, index) => { 
      return timings.foodTypes.filter((foodType => foodType.name === order.foodType))[0].steps.map((step) => {
        return createStep({ name: step.name, foodType: order.foodType, duration: step.duration, orderItemNumber: (index +1)})
      })
    }))
  }
}


module.exports = { Schedule: Schedule }



