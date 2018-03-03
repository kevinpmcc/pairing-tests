class snackShack {

  constructor(maxWaitTime) {
    this.maxWaitTime = maxWaitTime
    this.orders = []
    this.inventoryOfSandwiches = 45
    this.nextStartTime = 0
 }

  placeOrder(foodType='sandwich') {
    let latestOrder = new Order(foodType, this.nextStartTime)
    if (this.aboveMaxWaitTime(latestOrder)) return 'sorry, we cannot take your order as it would take too long'
    if ((this.orders.length + 1) > this.inventoryOfSandwiches) return 'sorry, we cannot take your order as we have no more stock'
    this.orders.push(latestOrder) 
    this.nextStartTime = latestOrder.completedTime()
    return 'estimated wait: ' + turnSecondsToMinutesAndSeconds(latestOrder.completedTime())
  }

  aboveMaxWaitTime(order) {
    if (this.maxWaitTime === 'undefined') return false
    return ((order.completedTime() > this.maxWaitTime))
  }

  getSchedule() {
    return this.firstLine() + this.additionalLines() + this.finalLine()
  }

  firstLine() {
    return '1. 0:00 ' + 'start making ' + this.orders[0].foodType + ' 1\n2. 0:60 serve ' + this.orders[0].foodType + ' 1'  
  }
  
  additionalLines(){
    if(this.orders.length <= 1) return '\n'
    let returnLines = ''
    for (var i = 1; i < this.orders.length; i++) {
      returnLines += '\n' + ((i * 2) + 1).toString() + '. ' + turnSecondsToMinutesAndSeconds(this.orders[i].makeTime()) + ' make sandwich ' + (i + 1).toString() + '\n' + ((i * 2) + 2).toString() + '. ' + turnSecondsToMinutesAndSeconds(this.orders[i].serveTime()) + ' serve sandwich ' + (i + 1).toString() 
    }
    return returnLines += '\n'
  } 
	
  finalLine(){
    return ((this.orders.length * 2) + 1).toString() + '. ' + turnSecondsToMinutesAndSeconds(this.orders.length * 90) + ' take a well earned break!'
  }
}

class Order {

  constructor(foodType, startTime) {
    this.foodType = foodType
    this.startTime = startTime
  }
  
  makeTime(){
    return this.startTime
  }

  serveTime(){
    return this.startTime + 60
  }

  completedTime(){
    return this.startTime + 90
  }
}

function turnSecondsToMinutesAndSeconds(totalSeconds) {
  let minutes = Math.floor(totalSeconds / 60).toString()  
  let seconds = (totalSeconds % 60).toString()
  if (seconds.length === 1) seconds = '0' + seconds
  return minutes + ':' + seconds
}

module.exports = { snackShack: snackShack,
                   turnSecondsToMinutesAndSeconds: turnSecondsToMinutesAndSeconds}
