function createOrder({ orderItem }, orderItemNumber, timings) {
    return { orderItem, orderItemNumber, totalTime: sumAllStepDurations(relevantSteps(timings, orderItem)) }
}

function sumAllStepDurations(steps) {
    return steps.reduce((a, b) => ({ duration: a.duration + b.duration  })).duration 
}

function relevantSteps(timings, orderItem) {
    return timings.orderItems.filter((timingsorderItem => timingsorderItem.name === orderItem))[0].steps
}

module.exports = createOrder