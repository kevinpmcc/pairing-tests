const Schedule = require('./schedule.js').Schedule
const timings = require('./foodTimings')
const formatSecondsToMinutes = require('./helperFunctions').formatSecondsToMinutes
const createOrder = require('./order')
class SnackShack {

  constructor() {
    this.orders = []
    this.currentTime = 0
  }

  placeOrder(foodType='sandwich') {
    let order = createOrder({ foodType })
    this.orders.push(order)
    this.currentTime += order.totalTime
    return 'estimated wait: ' + formatSecondsToMinutes(this.currentTime)    
  }

  getSchedule() {
    let schedule = new Schedule(timings)
    return schedule.getSchedule(this.orders)
  }
}




module.exports = { SnackShack: SnackShack }
