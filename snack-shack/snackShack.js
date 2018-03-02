class snackShack {

  constructor(maxWaitTime) {
    this.maxWaitTime = maxWaitTime
    this.numberOfOrders = 0
    this.inventoryOfSandwiches = 45
 }

  placeOrder() {
    if (this.aboveMaxWaitTime()) return 'sorry, we cannot take your order as it would take too long'
    if ((this.numberOfOrders + 1) > this.inventoryOfSandwiches) return 'sorry, we cannot take your order as we have no more stock'
    this.numberOfOrders++   
    return 'estimated wait: ' + turnSecondsToMinutesAndSeconds(this.numberOfOrders * 90)
  }

  aboveMaxWaitTime() {
    if (this.maxWaitTime == 'undefined') return false
    return ((this.numberOfOrders + 1) * 90) > this.maxWaitTime
  }

  getSchedule() {
    return this.firstLine() + this.additionalLines() + this.finalLine()
  }

  firstLine() {
    return '1. 0:00 ' + this.numberOfOrders + ' sandwich orders placed,' + ' start making sandwich 1\n2. 0:60 serve sandwich 1'  
  }
  
  additionalLines(){
    if(this.numberOfOrders <= 1) return '\n'
    let returnLines = ''
    for (var i = 1; i < this.numberOfOrders; i++) {
      let currentTime = i * 90
      returnLines += '\n' + ((i * 2) + 1).toString() + '. ' + turnSecondsToMinutesAndSeconds(currentTime) + ' make sandwich ' + (i + 1).toString() + '\n' + ((i * 2) + 2).toString() + '. ' + turnSecondsToMinutesAndSeconds(currentTime + 60) + ' serve sandwich ' + (i + 1).toString() 
    }
    return returnLines += '\n'
  } 
	
  finalLine(){
    return ((this.numberOfOrders * 2) + 1).toString() + '. ' + turnSecondsToMinutesAndSeconds(this.numberOfOrders * 90) + ' take a well earned break!'
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
