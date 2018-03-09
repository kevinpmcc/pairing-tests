const app = require('./snackShack')

test('snackShack starts with 0 orders', () => {
    let shack = new app.SnackShack()

    expect(shack.numberOfOrders).toBe(0)
})

test('snackShack#placeOrder increases number of orders by 1', () => {
    let shack = new app.SnackShack()

    shack.placeOrder()

    expect(shack.numberOfOrders).toBe(1)
})

test('snackShack#placeOrder increases number of orders each time', () => {
    let shack = new app.SnackShack()
    
    shack.placeOrder()
    shack.placeOrder()
    shack.placeOrder()
    shack.placeOrder()

    expect(shack.numberOfOrders).toBe(4)
})

test('snackShack#getSchedule returns the correct schedule when one order is place', () => {
    let shack = new app.SnackShack()
  
    shack.placeOrder()
    
    expect(shack.getSchedule()).toBe('1. 0:00 make sandwich 1\n2. 0:60 serve sandwich 1\n3. 1:30 take a break!')
  })
  
test('snackShack#getSchedule returns the correct schedule when two orders are placed', () => {
let shack = new app.SnackShack()

shack.placeOrder()
shack.placeOrder()

expect(shack.getSchedule()).toBe('1. 0:00 make sandwich 1\n2. 0:60 serve sandwich 1\n3. 1:30 make sandwich 2\n4. 2:30 serve sandwich 2\n5. 3:00 take a break!')
})