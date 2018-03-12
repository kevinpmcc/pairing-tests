const formatSecondsToMinutes = require('./helperFunctions').formatSecondsToMinutes
const createStep = require('./step.js')


class Schedule {
  constructor(timings) {
    this.timings = timings
  }

  getSchedule(orders) {
    let schedule = ''
    let lineNumber = 1
    let seconds = 0
    this.createSteps(orders).map(step => {
      schedule += Schedule.standardLine(lineNumber, seconds, step)
      lineNumber ++
      seconds += step.duration
    })
    schedule += Schedule.finalLine(lineNumber, seconds)
    return schedule
  }

  static standardLine(lineNumber, seconds, step) {
    return lineNumber + '. ' + formatSecondsToMinutes(seconds) + ' ' + step.name + ' ' + step.orderItem + ' ' + step.orderItemNumber + '\n'
  }

  static finalLine(lineNumber, seconds) {
    return lineNumber + '. ' + formatSecondsToMinutes(seconds) + ' take a break!'
  }

  createSteps(orders) {
    return Array.prototype.concat(...orders.map((order, index) => { 
      return this.filterTimingsForOrderItem(order.orderItem).map((step) => {
        return createStep({ name: step.name, orderItem: order.orderItem, duration: step.duration, orderItemNumber: (index +1)})
      })
    }))
  }

  filterTimingsForOrderItem(currentOrderItem) {
    return this.timings.orderItems.filter((orderItem => orderItem.name === currentOrderItem))[0].steps
  }
}


module.exports = { Schedule: Schedule }



