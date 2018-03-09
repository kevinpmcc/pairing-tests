class SnackShack {

  constructor() {
    this.numberOfOrders = 0
  }

  placeOrder() {
    this.numberOfOrders++
  }

  getSchedule() {
    let schedule = ''
    schedule += '1. 0:00 make sandwich 1\n2. 0:60 serve sandwich 1\n'
    if (this.numberOfOrders === 1) schedule += '3. 1:30 take a break!'
    if (this.numberOfOrders === 2) {
      schedule += '3. 1:30 make sandwich 2\n4. 2:30 serve sandwich 2\n'
      schedule += '5. 3:00 take a break!'
    }
    return schedule
  }
}

module.exports = { SnackShack: SnackShack }
