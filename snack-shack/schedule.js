const createStep = require('./step.js')
const Printer = require('./printer')


class Schedule {
  constructor(timings) {
    this.timings = timings
  }

  getSchedule(orders) {
    let steps = this.createSteps(orders)
    return Printer.printSchedule(steps)
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
}


module.exports = { Schedule: Schedule }



