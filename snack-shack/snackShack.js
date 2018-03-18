const getSchedule = require('./schedule.js').getSchedule
const timings = require('./foodTimings')
const formatSecondsToMinutes = require('./helperFunctions').formatSecondsToMinutes
const createOrder = require('./order')
class SnackShack {

  constructor() {
    this.orders = []
    this.currentTime = 0
  }

  placeOrder(orderItem='sandwich') {
    let order = createOrder({ orderItem }, this.howManyOfOrderItemOrdered(orderItem), timings)
    this.orders.push(order)
    this.currentTime += order.totalTime
    return 'estimated wait: ' + formatSecondsToMinutes(this.currentTime)    
  }

  getSchedule() {
    return getSchedule(this.orders, timings)
  }

  howManyOfOrderItemOrdered(orderItem) {
    return this.orders.filter(order => order.orderItem === orderItem).length
  }
}




module.exports = { SnackShack: SnackShack }
