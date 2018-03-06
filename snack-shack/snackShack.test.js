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

test.only('placeOrder returns expected wait time for first order', () => {
  let shack = new app.SnackShack()

  expect(shack.placeOrder()).toBe('estimated wait: 1:30')
})

test.only('placeOrder returns expected for second order', () => {
  let shack = new app.SnackShack()
  
  shack.placeOrder()

  expect(shack.placeOrder()).toBe('estimated wait: 3:00')
})

test.only('placeOrder returns expected for second order', () => {
  let shack = new app.SnackShack()

  shack.placeOrder()
  shack.placeOrder()
  shack.placeOrder()

  expect(shack.placeOrder()).toBe('estimated wait: 6:00')
})

test.only('placeOrder returns expected for jacket potato order', () => {
  let shack = new app.SnackShack()

  expect(shack.placeOrder('jacket potato')).toBe('estimated wait: 4:31')
})

test('if max order wait time is given, reject orders placed where wait time is over the time', () => {
  let maxWaitTime = 5
  let shack = new app.SnackShack(maxWaitTime)

  shack.placeOrder()
  shack.placeOrder()
  shack.placeOrder()

  expect(shack.placeOrder()).toBe('sorry, we cannot take your order as it would take too long')
})

test('if orders are above inventory, reject orders', () => {
  let shack = new app.SnackShack()

  for (var i = 0; i < 46; i++) {
    shack.placeOrder()
  }

  expect(shack.placeOrder()).toBe('sorry, we cannot take your order as we have no more stock')
})

test('can serve jacket potatoes as well as sandwiches', () => {
  let shack = new app.SnackShack()

  shack.placeOrder('jacket potato')
  shack.placeOrder('sandwich')
  shack.placeOrder('sandwich')

  expect(shack.getSchedule()).toBe('1. 0:00 Put jacket potato in microwave\n2. 0:01 make sandwich 1\n3. 1:01 serve sandwich 1\n4. 1:31 make sandwich 2\n5. 2:31 serve sandwich 2\n6. 3:01 take jacket potato out of microwave\n7. 3:31 top jacket potato\n8. 4:01 serve jacket potato\n9. 4:31 take a break!')
})


test.only('returns the next available time', () => {
  let fakeTimings = [{
    foodType: 'sandwich',
    steps: [{ name: 'make', duration: 60, blocking: true },
            { name: 'serve', duration: 30, blocking: true }]
  },
  {
    foodType: 'jacket potato',
    steps: [{ name: 'putInMicrowave', duration: 1, blocking: true },
            { name: 'cook', duration: 180, blocking: false },
            { name: 'takeOutOfMicrowave', duration: 30, blocking: true },            
            { name: 'top', duration: 30, blocking: true },
            { name: 'serve', duration: 30, blocking: true }]            
            }  ]
    
  expect(app.timeTillNextAvailable(fakeTimings, 'sandwich')).toBe(90)
})

test.only('returns the next available time for jacket potato', () => {
  let fakeTimings = [{
    foodType: 'sandwich',
    steps: [{ name: 'make', duration: 60, blocking: true },
            { name: 'serve', duration: 30, blocking: true }]
  },
  {
    foodType: 'jacket potato',
    steps: [{ name: 'putInMicrowave', duration: 1, blocking: true },
            { name: 'cook', duration: 180, blocking: false },
            { name: 'takeOutOfMicrowave', duration: 30, blocking: true },            
            { name: 'top', duration: 30, blocking: true },
            { name: 'serve', duration: 30, blocking: true }]            
            }  ]
    
  expect(app.timeTillNextAvailable(fakeTimings, 'jacket potato')).toBe(1)
})

test.only('returns the next available time for jacket potato when multiple steps', () => {
  let fakeTimings = [{
    foodType: 'sandwich',
    steps: [{ name: 'make', duration: 60, blocking: true },
            { name: 'serve', duration: 30, blocking: true }]
  },
  {
    foodType: 'jacket potato',
    steps: [{ name: 'putInMicrowave', duration: 1, blocking: true },
            { name: 'cook', duration: 180, blocking: true },
            { name: 'takeOutOfMicrowave', duration: 30, blocking: false },            
            { name: 'top', duration: 30, blocking: true },
            { name: 'serve', duration: 30, blocking: true }]            
            }  ]
    
  expect(app.timeTillNextAvailable(fakeTimings, 'jacket potato')).toBe(181)
})

test.only('returns the total time for an item', () => {
  let fakeTimings = [{
    foodType: 'sandwich',
    steps: [{ name: 'make', duration: 60, blocking: true },
            { name: 'serve', duration: 30, blocking: true }]
  },
  {
    foodType: 'jacket potato',
    steps: [{ name: 'putInMicrowave', duration: 1, blocking: true },
            { name: 'cook', duration: 180, blocking: true },
            { name: 'takeOutOfMicrowave', duration: 30, blocking: false },            
            { name: 'top', duration: 30, blocking: true },
            { name: 'serve', duration: 30, blocking: true }]            
            }  ]
    
  expect(app.timeTillComplete(fakeTimings, 'jacket potato')).toBe(271)
})

test.only('returns the total time for an item', () => {
  let fakeTimings = [{
    foodType: 'sandwich',
    steps: [{ name: 'make', duration: 60, blocking: true },
            { name: 'serve', duration: 30, blocking: true }]
  },
  {
    foodType: 'jacket potato',
    steps: [{ name: 'putInMicrowave', duration: 1, blocking: true },
            { name: 'cook', duration: 180, blocking: true },
            { name: 'takeOutOfMicrowave', duration: 30, blocking: false },            
            { name: 'top', duration: 30, blocking: true },
            { name: 'serve', duration: 30, blocking: true }]            
            }  ]
    
  expect(app.timeTillComplete(fakeTimings, 'sandwich')).toBe(90)
})





test('turnSecondsToMinutesAndSeconds when given 90 returns 1:30', () => {
  expect(app.turnSecondsToMinutesAndSeconds(90)).toBe('1:30')
})

test('turnsecondstominutesandseconds when given 250 returns 4:10', () => {
  expect(app.turnSecondsToMinutesAndSeconds(250)).toBe('4:10')
})

test('turnsecondstominutesandseconds when given 240 returns 4:00', () => {
  expect(app.turnSecondsToMinutesAndSeconds(240)).toBe('4:00')
})

