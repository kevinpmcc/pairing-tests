const timings = require('./foodTimings')

const createOrder =  ({ foodType }) => ({
    foodType,
    totalTime: sumAllStepDurations(timings.foodTypes.filter((timingsFoodType => timingsFoodType.name === foodType))[0].steps)
})

function sumAllStepDurations(steps) {
    return steps.reduce((a, b) => ({ duration: a.duration + b.duration  })).duration 
}

module.exports = createOrder