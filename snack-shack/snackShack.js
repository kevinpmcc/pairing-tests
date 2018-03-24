const getSchedule = require('./schedule.js').getSchedule
const timings = require('./foodTimings')
const formatSecondsToMinutes = require('./helperFunctions').formatSecondsToMinutes
const createOrder = require('./order')
class SnackShack {

  constructor(maxWaitTime) {
    this.maxWaitTime = maxWaitTime
    this.orders = []
    this.currentTime = 0
  }

  placeOrder(orderItem='sandwich') {
    let order = createOrder({ orderItem }, this.howManyOfItemOrdered(orderItem) + 1, timings)
    if (this.currentTime + order.totalTime > this.maxWaitTime) return "sorry, we cannot take your order as it would take too long"
    this.orders.push(order)
    this.currentTime += order.totalTime
    return 'estimated wait: ' + formatSecondsToMinutes(this.currentTime)    
  }

  getSchedule() {
    return getSchedule(this.orders, timings)
  }

  howManyOfItemOrdered(orderItem) {
    return this.orders.filter(order => order.orderItem === orderItem).length
  }
}




module.exports = { SnackShack: SnackShack }
