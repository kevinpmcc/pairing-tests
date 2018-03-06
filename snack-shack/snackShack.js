class SnackShack {

  constructor(maxWaitTime) {
    this.maxWaitTime = maxWaitTime
    this.inventoryOfSandwiches = 45
    this.nextStartTime = 0
    this.numberOfSandwichesOrdered = 0
    this.steps = []
  }

  placeOrder(foodType='sandwich') {
    let latestOrder
    // if (foodType === 'sandwich') {
    latestOrder = new Order(foodType, this.nextStartTime)
      // if (this.unableToAcceptOrder(latestOrder)) return this.unableToAcceptOrder(latestOrder) 
    this.numberOfSandwichesOrdered += 1
    latestOrder.addNumber(this.numberOfSandwichesOrdered)
  
    // }
    // if (foodType === 'jacket potato'){
    //   latestOrder = new JacketPotato(foodType, this.nextStartTime)
    // }
    let steps = FoodTimings.filter(food => food.foodType = foodType)[0].steps

    let timeWhenAvailable = steps.filter(({blocking}) => blocking) 
                                  .reduce((a, b) => ({ duration: a.duration + b.duration  })).duration
    
    let totalTime = steps.reduce((a, b) => ({ duration: a.duration + b.duration  })).duration
    let serveTime = this.nextStartTime += totalTime
    this.nextStartime += timeWhenAvailable
    let total = 0
   
    console.log(total)
    // latestOrder.steps().map( step => this.steps.push(step))
    return 'estimated wait: ' + turnSecondsToMinutesAndSeconds(serveTime)
  }

  getSchedule(){
    let schedule = new ScheduleMaker(this.steps)
    return schedule.getSchedule()
  }

  unableToAcceptOrder(latestOrder){
    if (this.aboveMaxWaitTime(latestOrder)) return 'sorry, we cannot take your order as it would take too long'
    if (this.numberOfSandwichesOrdered + 1 > this.inventoryOfSandwiches) return 'sorry, we cannot take your order as we have no more stock'
    return false
  } 

  aboveMaxWaitTime(order) {
    if (this.maxWaitTime === 'undefined') return false
    return ((order.completedTime() > this.maxWaitTime))
  }
}
 
class ScheduleMaker {
  constructor(steps) {
    this.currentLine = 1
    this.steps = steps
  }

  getSchedule() {
    return this.standardLines() + this.finalLine()
  }

  standardLines() {
    let returnLines = ''
    let sortedSteps = sortArrayByKey(this.steps, 'startTime')
    for (var i = 0; i < this.steps.length; i++) {
      let currentStep = sortedSteps[i]
      if (i !== 0) returnLines += '\n'
      switch (currentStep.step) {
        case 'makeSandwich':
          returnLines += this.makeLine(currentStep.order)
          break
        case 'serveSandwich': 
          returnLines +=  this.serveSandwichLine(currentStep.order) 
          break
        case 'putInMicrowave':
          returnLines += this.putInMicrowaveLine(currentStep.order)
          break
        case 'takeOutOfMicrowave':
          returnLines += this.takeOutOfMicrowaveLine(currentStep.order)
          break
        case 'topPotato':
          returnLines += this.topPotatoLine(currentStep.order)
          break
        case 'servePotato':
          returnLines += this.servePotatoLine(currentStep.order)
        } 
    }
    return returnLines += '\n'
  } 

  finalLine(){
    let lineNumber = this.getCurrentLine()
    let previousStep = sortArrayByKey(this.steps, 'startTime')[this.steps.length - 1]
    return lineNumber + '. ' + turnSecondsToMinutesAndSeconds(previousStep.order.completedTime()) + ' take a break!'
  }

  getCurrentLine() {
    return this.currentLine.toString()
  }

  newLine() {
    let lineNumber = this.getCurrentLine()
    this.currentLine += 1
    return lineNumber
  }

  makeLine(currentOrder) {
    return this.newLine() + '. ' + turnSecondsToMinutesAndSeconds(currentOrder.makeTime()) + ' make ' + currentOrder.foodType + ' ' + (currentOrder.sandwichNumber).toString()
  }

  serveSandwichLine(currentOrder) {
    return this.newLine() + '. ' + turnSecondsToMinutesAndSeconds(currentOrder.serveTime()) + ' serve sandwich ' + (currentOrder.sandwichNumber).toString() 
  }

  putInMicrowaveLine(currentOrder) {
    return this.newLine() + '. ' + turnSecondsToMinutesAndSeconds(currentOrder.putInMicrowaveTime()) + ' Put ' + currentOrder.foodType + ' in microwave'
  }
  
  takeOutOfMicrowaveLine(currentOrder) {
    return this.newLine() + '. ' + turnSecondsToMinutesAndSeconds(currentOrder.takeOutOfMicrowaveTime()) + ' take ' + currentOrder.foodType + ' out of microwave'
  }

  topPotatoLine(currentOrder) {
    return this.newLine() + '. ' + turnSecondsToMinutesAndSeconds(currentOrder.toppingTime()) + ' top jacket potato'
  }

  servePotatoLine(currentOrder) {
    return this.newLine() + '. ' + turnSecondsToMinutesAndSeconds(currentOrder.serveTime()) + ' serve jacket potato'
  }

}
  
class Order {
  constructor(foodType, startTime){
    this.foodType = foodType
    this.startTime = startTime
    this.number
  }
  addNumber(number){
    this.number = number
  }
}

const FoodTimings = [{
    foodType: 'sandwich',
    steps: [{ name: 'make', duration: 60, blocking: true },
            { name: 'serve', duration: 30, blocking: true }]
  },
  {
    foodType: 'jacket potato',
    steps: [{ name: 'putInMicrowave', duration: 1, blocking: true},
            { name: 'cook', duration: 180, blocking: false}  ]
  }]

class Sandwich {

  constructor(foodType, startTime) {
    this.foodType = foodType
    this.startTime = startTime
    this.sandwichNumber
  }

  // steps(){
  //   return [{ order: this, step: 'makeSandwich', startTime: this.makeTime() },
  //           { order: this, step: 'serveSandwich', startTime: this.serveTime() }]
  // }

  // addSandwichNumber(number){
  //   this.sandwichNumber = number
  // }
  
  // makeTime(){
  //   return this.startTime
  // }

  // freeForOtherThingsTime() {
  //   return this.startTime + 90
  // }


  // serveTime(){
  //   return this.startTime + 60
  // }

 
  // completedTime(){
  //   return this.startTime + 90
  // }
}


class JacketPotato {
  constructor(foodType, startTime) {
    this.foodType = foodType
    this.startTime = startTime
  }

  steps(){
    return [  { order: this, step: 'putInMicrowave', startTime: this.putInMicrowaveTime() },
              { order: this, step: 'takeOutOfMicrowave', startTime: this.takeOutOfMicrowaveTime() },
              { order: this, step: 'topPotato', startTime: this.toppingTime() },
              { order: this, step: 'servePotato', startTime: this.serveTime() }]
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

module.exports = { SnackShack: SnackShack,
                   turnSecondsToMinutesAndSeconds: turnSecondsToMinutesAndSeconds}
