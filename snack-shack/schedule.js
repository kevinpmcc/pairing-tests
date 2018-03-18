const createStep = require('./step.js')
const printSchedule = require('./printer')
const foodTimings = require('./foodTimings')


function getSchedule(orders, timings=foodTimings) {
  let steps = createSteps(orders, timings)
  return printSchedule(steps)
}

function createSteps(orders, timings) {
  let flattenedSteps = Array.prototype.concat(...createUnflattenedSteps(orders, timings))
  return addStartTimeToSteps(flattenedSteps)
}

function createUnflattenedSteps(orders, timings) {
  return orders.map((order, orderIndex) => { 
    return filterTimingsForOrderItem(order.orderItem, timings).map((step, stepIndex) => {
      return createStep({ name: step.name, orderItem: order.orderItem, duration: step.duration, startTime: '', orderItemNumber: order.orderItemNumber})
    })
  })
}

function filterTimingsForOrderItem(currentOrderItem, timings) {
  return timings.orderItems.filter((orderItem => orderItem.name === currentOrderItem))[0].steps
}

function addStartTimeToSteps(flattenedSteps) {
  return flattenedSteps.map((flattenedStep, index) => {
    if (index === 0 ) flattenedStep.startTime = 0
    if (index !== 0) flattenedStep.startTime = getDurationOfAllPreviousSteps(flattenedSteps, index)
    return flattenedStep
  })
}

function getDurationOfAllPreviousSteps(flattenedSteps, index) {
  let relevantSteps = flattenedSteps.slice(0, index)
  return relevantSteps.reduce((a, b) => ({ duration: a.duration + b.duration  })).duration
}



module.exports = {  getSchedule: getSchedule, 
                    createSteps: createSteps,
                    addStartTimeToSteps: addStartTimeToSteps }



