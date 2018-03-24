const getSchedule = require('./schedule.js').getSchedule
const timings = require('./foodTimings')
const formatSecondsToMinutes = require('./helperFunctions').formatSecondsToMinutes
const createOrder = require('./order')
class SnackShack {

  constructor(maxWaitTime, inventory) {
    this.inventory = inventory
    this.maxWaitTime = maxWaitTime
    this.orders = []
    this.currentTime = 0
  }

  placeOrder(orderItem='sandwich') {
    if (this.notEnoughInventory(orderItem)) return "sorry, we cannot take your order as we have no more stock"
    let order = createOrder({ orderItem }, this.howManyOfItemOrdered(orderItem) + 1, timings)
    if (this.currentTime + order.totalTime > this.maxWaitTime) return "sorry, we cannot take your order as it would take too long"
    this.orders.push(order)
    if (this.inventory) this.inventory[orderItem] -= 1
    this.currentTime += order.totalTime
    return 'estimated wait: ' + formatSecondsToMinutes(this.currentTime)    
  }

  getSchedule() {
    return getSchedule(this.orders, timings)
  }

  howManyOfItemOrdered(orderItem) {
    return this.orders.filter(order => order.orderItem === orderItem).length
  }

  notEnoughInventory(orderItem) {
    if (this.inventory === undefined) return false
    return this.inventory[orderItem] === 0
  }
}

module.exports = { SnackShack: SnackShack }
