class snackShack {

  constructor() {
    this.numberOfOrders = 0
  }

  placeOrder() {
    this.numberOfOrders++   
  }

  getSchedule() {
    return '1. 0:00 ' + this.numberOfOrders + ' sandwich orders placed, start making sandwich 1\n2. 0:60 serve sandwich 1'
  }
}

module.exports = snackShack
