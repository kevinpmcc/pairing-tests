const app = require('./snackShack')

test('it returns the correct schedule when one order is place', () => {
  let shack = new app.SnackShack()

  shack.placeOrder()
  
  expect(shack.getSchedule()).toBe('1. 0:00 make sandwich 1\n2. 0:60 serve sandwich 1\n3. 1:30 take a break!')
})

test('it returns the correct schedule when two orders are placed', () => {
  let shack = new app.SnackShack()

  shack.placeOrder()
  shack.placeOrder()
  
  expect(shack.getSchedule()).toBe('1. 0:00 make sandwich 1\n2. 0:60 serve sandwich 1\n3. 1:30 make sandwich 2\n4. 2:30 serve sandwich 2\n5. 3:00 take a break!')
})

test('it returns the correct schedule when four orders are placed', () => {
  let shack = new app.SnackShack()

  shack.placeOrder()
  shack.placeOrder()
  shack.placeOrder()
  shack.placeOrder()
  
  expect(shack.getSchedule()).toBe('1. 0:00 make sandwich 1\n2. 0:60 serve sandwich 1\n3. 1:30 make sandwich 2\n4. 2:30 serve sandwich 2\n5. 3:00 make sandwich 3\n6. 4:00 serve sandwich 3\n7. 4:30 make sandwich 4\n8. 5:30 serve sandwich 4\n9. 6:00 take a break!')
})

test('placeOrder returns expected wait time for first order', () => {
  let shack = new app.SnackShack()

  expect(shack.placeOrder()).toBe('estimated wait: 1:30')
})

test('placeOrder returns expected for second order', () => {
  let shack = new app.SnackShack()
  
  shack.placeOrder()

  expect(shack.placeOrder()).toBe('estimated wait: 3:00')
})

test('placeOrder returns expected for second order', () => {
  let shack = new app.SnackShack()
  
  shack.placeOrder()
  shack.placeOrder()
  shack.placeOrder()

  expect(shack.placeOrder()).toBe('estimated wait: 6:00')
})

test('placeOrder returns expected for jacket potato order', () => {
  let shack = new app.SnackShack()

  expect(shack.placeOrder('jacket potato')).toBe('estimated wait: 4:31')
})

xtest('if max order wait time is given, reject orders placed where wait time is over the time', () => {
  let maxWaitTime = 5
  let shack = new app.SnackShack(maxWaitTime)

  shack.placeOrder()
  shack.placeOrder()
  shack.placeOrder()

  expect(shack.placeOrder()).toBe('sorry, we cannot take your order as it would take too long')
})

xtest('if orders are above inventory, reject orders', () => {
  let shack = new app.SnackShack()

  for (var i = 0; i < 46; i++) {
    shack.placeOrder()
  }

  expect(shack.placeOrder()).toBe('sorry, we cannot take your order as we have no more stock')
})

xtest('can serve jacket potatoes as well as sandwiches', () => {
  let shack = new app.SnackShack()

  shack.placeOrder('jacket potato')
  shack.placeOrder('sandwich')
  shack.placeOrder('sandwich')

  expect(shack.getSchedule()).toBe('1. 0:00 Put jacket potato in microwave\n2. 0:01 make sandwich 1\n3. 1:01 serve sandwich 1\n4. 1:31 make sandwich 2\n5. 2:31 serve sandwich 2\n6. 3:01 take jacket potato out of microwave\n7. 3:31 top jacket potato\n8. 4:01 serve jacket potato\n9. 4:31 take a break!')
})


