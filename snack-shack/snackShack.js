class snackShack {

  constructor() {
    this.numberOfOrders = 0
  }

  placeOrder() {
    this.numberOfOrders++   
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
    let currentTime = 90
    for (var i = 1; i < this.numberOfOrders; i++) {
      returnLines += '\n' + (i + 2).toString() + '. ' + snackShack.turnSecondsToMinutesAndSeconds(currentTime) + ' start making sandwich ' + (i + 1).toString() + '\n' + (i + 3).toString() + '. ' + snackShack.turnSecondsToMinutesAndSeconds(currentTime + 60) + ' serve sandwich ' + (i + 1).toString() 
    }
    return returnLines += '\n'
  } 
	
  finalLine(){
    return ((this.numberOfOrders * 2) + 1).toString() + '. ' + snackShack.turnSecondsToMinutesAndSeconds(this.numberOfOrders * 90) + ' take a well earned break!'
  }

  static turnSecondsToMinutesAndSeconds(totalSeconds) {
    let minutes = Math.floor(totalSeconds / 60).toString()  
    let seconds = (totalSeconds % 60).toString()
    if (seconds.length === 1) seconds = '0' + seconds
    return minutes + ':' + seconds
  }
}

module.exports = snackShack
