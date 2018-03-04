class snackShack {

  constructor(maxWaitTime) {
    this.maxWaitTime = maxWaitTime
    this.orders = []
    this.inventoryOfSandwiches = 45
    this.nextStartTime = 0
    this.numberOfSandwichesOrdered = 0
    this.currentLine = 1
    this.steps = []
 }

  placeOrder(foodType='sandwich') {
    if (foodType === 'sandwich') {
      let latestOrder = new Sandwich(foodType, this.nextStartTime)
      if (this.aboveMaxWaitTime(latestOrder)) return 'sorry, we cannot take your order as it would take too long'
      if (this.numberOfSandwichesOrdered + 1 > this.inventoryOfSandwiches) return 'sorry, we cannot take your order as we have no more stock'
      this.numberOfSandwichesOrdered += 1
      latestOrder.addSandwichNumber(this.numberOfSandwichesOrdered)
      this.orders.push(latestOrder) 
      this.steps.push({ order: latestOrder, step: 'makeSandwich', startTime: latestOrder.makeTime() })
      this.steps.push({ order: latestOrder, step: 'serveSandwich', startTime: latestOrder.serveTime() })
      this.nextStartTime = latestOrder.completedTime()
      return 'estimated wait: ' + turnSecondsToMinutesAndSeconds(latestOrder.completedTime())
    }
    if (foodType === 'jacketPotato'){
      let latestOrder = new JacketPotato(foodType, this.nextStartTime)
      this.orders.push(latestOrder)
      this.steps.push({ order: latestOrder, step: 'putInMicrowave', startTime: latestOrder.putInMicrowaveTime() })
      this.steps.push({ order: latestOrder, step: 'takeOutOfMicrowave', startTime: latestOrder.takeOutOfMicrowaveTime() })
      this.steps.push({ order: latestOrder, step: 'topPotato', startTime: latestOrder.toppingTime() })
      this.steps.push({ order: latestOrder, step: 'servePotato', startTime: latestOrder.serveTime() })
      this.nextStartTime = latestOrder.freeForOtherThingsTime()
      return 'estimated wait: ' + turnSecondsToMinutesAndSeconds(latestOrder.completedTime())
    }
  }

  aboveMaxWaitTime(order) {
    if (this.maxWaitTime === 'undefined') return false
    return ((order.completedTime() > this.maxWaitTime))
  }

  getSchedule() {
    return this.additionalLines() + this.finalLine()
  }


  getCurrentLine() {
    return this.currentLine.toString()
  }

  newLine() {
    let lineNumber = this.getCurrentLine()
    this.currentLine += 1
    return lineNumber
  }


  makeSandwichLine(currentOrder) {
    return this.newLine() + '. ' + turnSecondsToMinutesAndSeconds(currentOrder.makeTime()) + ' make sandwich ' + (currentOrder.sandwichNumber).toString()
  }

 serveSandwichLine(currentOrder) {
    return this.newLine() + '. ' + turnSecondsToMinutesAndSeconds(currentOrder.serveTime()) + ' serve sandwich ' + (currentOrder.sandwichNumber).toString() 
  }

  putInMicrowaveLine(currentOrder) {
    return this.newLine() + '. ' + turnSecondsToMinutesAndSeconds(currentOrder.putInMicrowaveTime()) + ' Put jacket potato in microwave'
  }
  
  takeOutOfMicrowaveLine(currentOrder) {
    console.log('called')
    return this.newLine() + '. ' + turnSecondsToMinutesAndSeconds(currentOrder.takeOutOfMicrowaveTime()) + ' take jacket potato out of microwave'
  }

  topPotatoLine(currentOrder) {
    return this.newLine() + '. ' + turnSecondsToMinutesAndSeconds(currentOrder.toppingTime()) + ' top jacket potato'
  }

  servePotatoLine(currentOrder) {
    return this.newLine() + '. ' + turnSecondsToMinutesAndSeconds(currentOrder.serveTime()) + ' serve jacket potato'
  }



  additionalLines() {
    let returnLines = ''
    let sortedSteps = sortArrayByKey(this.steps, 'startTime')
    for (var i = 0; i < this.steps.length; i++) {
      let currentStep = sortedSteps[i]
      if ((currentStep.step === 'makeSandwich') && (i === 0)) { 
        returnLines += '1. 0:00 start making sandwich 1'
        this.currentLine += 1
      }
      if (currentStep.step === 'makeSandwich' && i > 0) returnLines += '\n' + this.makeSandwichLine(currentStep.order)
      if (currentStep.step === 'serveSandwich') returnLines +=  '\n' + this.serveSandwichLine(currentStep.order) 
      if (currentStep.step === 'putInMicrowave' && (i === 0)) {
        returnLines += '1. 0:00 Put jacket potato in microwave'
        this.currentLine += 1
      }
      if (currentStep.step === 'putInMicrowave' && (i > 0)) returnLines += this.putInMicrowaveLine(currentStep.order)
      if (currentStep.step === 'takeOutOfMicrowave') returnLines += '\n' + this.takeOutOfMicrowaveLine(currentStep.order)
      if (currentStep.step === 'topPotato') returnLines += '\n' + this.topPotatoLine(currentStep.order)
      if (currentStep.step === 'servePotato') returnLines += '\n' + this.servePotatoLine(currentStep.order)

    }
    return returnLines += '\n'
  } 

  finalLine(){
    let lineNumber = this.getCurrentLine()
    let previousStep = sortArrayByKey(this.steps, 'startTime')[this.steps.length - 1]
    return lineNumber + '. ' + turnSecondsToMinutesAndSeconds(previousStep.startTime + 30) + ' take a break!'
  }
}

class Sandwich {

  constructor(foodType, startTime) {
    this.foodType = foodType
    this.startTime = startTime
    this.sandwichNumber
  }

  addSandwichNumber(number){
    this.sandwichNumber = number
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

class JacketPotato {
  constructor(foodType, startTime) {
    this.foodType = foodType
    this.startTime = startTime
  }

  putInMicrowaveTime() {
    return this.startTime
  }

  freeForOtherThingsTime() {
    return this.startTime + 1
  }

  takeOutOfMicrowaveTime() {
    return this.startTime + 181
  }

  toppingTime() {
    return this.startTime + 211
  }

  serveTime() {
    return this.startTime + 241
  }  

  completedTime(){
    return this.startTime + 271
  }
}



function turnSecondsToMinutesAndSeconds(totalSeconds) {
  if (totalSeconds === 60) return '0:60'
  let minutes = Math.floor(totalSeconds / 60).toString()  
  let seconds = (totalSeconds % 60).toString()
  if (seconds.length === 1) seconds = '0' + seconds
  return minutes + ':' + seconds
}

var sortArrayByKey = (function() {
  var sorters = {
    string: function(a, b) {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    },

    number: function(a, b) {
      return a - b;
    }
  };

  return function(ary, prop) {
    var type = typeof ary[0][prop] || 'string';
    return ary.sort(function(a, b) {
      return sorters[type](a[prop], b[prop]);
    });
  };
})();

module.exports = { snackShack: snackShack,
                   turnSecondsToMinutesAndSeconds: turnSecondsToMinutesAndSeconds}
