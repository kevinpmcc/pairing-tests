const createOrder =  ({ orderItem }, timings) => ({
    orderItem,
    totalTime: sumAllStepDurations(timings.orderItems.filter((timingsorderItem => timingsorderItem.name === orderItem))[0].steps)
})

function sumAllStepDurations(steps) {
    return steps.reduce((a, b) => ({ duration: a.duration + b.duration  })).duration 
}

module.exports = createOrder