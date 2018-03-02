class snackShack {

  constructor() {
    this.numberOfOrders = 0
  }

  placeOrder() {
    this.numberOfOrders++   
  }

  getSchedule() {
    return this.firstLine() + this.finalLine()
  }

  firstLine(){
    return '1. 0:00 ' + this.numberOfOrders + ' sandwich orders placed,' + ' start making sandwich 1\n2. 0:60 serve sandwich 1\n' 
  }
  
  additionalLines(){
    return '\n3. 1:30 start making sandwich 2\n4. 2:30 serve sandwich 2\n'
  } 
	
  finalLine(){
    return '3. 1:30 take a well earned break!'
  }
}

module.exports = snackShack
