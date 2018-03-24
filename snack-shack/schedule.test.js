const app = require('./schedule.js')


const fakeTimings = {
        orderItems: [ 
            {   
                name: 'fakeitem1',
                steps: [
                    { name: 'fakestep1', duration: 5},
                    { name: 'fakestep2', duration: 60}
                ]
            },
            {    
                name: 'fakeitem2',
                steps: [
                    { name: 'fakestep1', duration: 10},
                    { name: 'fakestep2', duration: 20},
                    { name: 'fakestep3', duration: 30},
                    { name: 'fakestep4', duration: 40}
                ] 
            }
        ]
}

const timings = require('./foodTimings')


test('schedule#getSchedule returns the correct schedule when one sandwich order has been placed', () => {
  let orders = [{ orderItem: 'fakeitem1', orderItemNumber: 1 }]

  expect(app.getSchedule(orders, fakeTimings)).toBe('1. 0:00 fakestep1 fakeitem1 1\n2. 0:05 fakestep2 fakeitem1 1\n3. 1:05 take a break!')
})

test('schedule#getSchedule returns the correct schedule when two sandwich orders have been placed', () => {
let orders = [{ orderItem: 'fakeitem1', orderItemNumber: 1 }, { orderItem: 'fakeitem1', orderItemNumber: 2 }]

expect(app.getSchedule(orders, fakeTimings)).toBe('1. 0:00 fakestep1 fakeitem1 1\n2. 0:05 fakestep2 fakeitem1 1\n3. 1:05 fakestep1 fakeitem1 2\n4. 1:10 fakestep2 fakeitem1 2\n5. 2:10 take a break!')
})

test('schedule#getSchedule returns the correct schedule when four sandwich orders have been placed', () => {
  let orders = [{ orderItem: 'fakeitem1', orderItemNumber: 1 }, { orderItem: 'fakeitem1', orderItemNumber: 2 }, { orderItem: 'fakeitem1', orderItemNumber: 3 }, { orderItem: 'fakeitem1', orderItemNumber: 4 }]
  
  expect(app.getSchedule(orders, fakeTimings)).toBe('1. 0:00 fakestep1 fakeitem1 1\n2. 0:05 fakestep2 fakeitem1 1\n3. 1:05 fakestep1 fakeitem1 2\n4. 1:10 fakestep2 fakeitem1 2\n5. 2:10 fakestep1 fakeitem1 3\n6. 2:15 fakestep2 fakeitem1 3\n7. 3:15 fakestep1 fakeitem1 4\n8. 3:20 fakestep2 fakeitem1 4\n9. 4:20 take a break!')
  })

  test('schedule#createSteps returns the correct number of steps for an item', () => {

    expect(app.createSteps([{ orderItem: 'fakeitem1' }], fakeTimings).length).toEqual(2)
  })

  test('schedule#createSteps returns the correct number of steps', () => {

    expect(app.createSteps([{ orderItem: 'fakeitem1', orderItemNumber: 1 }, { orderItem: 'fakeitem1', orderItemNumber: 2 }], fakeTimings).length).toEqual(4)
  })

  test('schedule#createSteps returns the correct number of steps', () => {

    expect(app.createSteps([{ orderItem: 'fakeitem1', orderItemNumber: 1 }, { orderItem: 'fakeitem2', orderItemNumber: 2 }], fakeTimings).length).toEqual(6)
  })

  test('returns all necessary elements in steps', () => {

    expect(app.createSteps([{ orderItem: 'fakeitem1', orderItemNumber: 1 }], fakeTimings)).toEqual(
      [ { name: 'fakestep1', orderItem: 'fakeitem1', duration: 5, orderItemNumber: 1, startTime: 0 },
        { name: 'fakestep2', orderItem: 'fakeitem1', duration: 60, orderItemNumber: 1, startTime: 5 }
      ])
  })

  test('returns all necessary elements in steps', () => {

    expect(app.createSteps([{ orderItem: 'fakeitem1', orderItemNumber: 1 }, { orderItem: 'fakeitem1', orderItemNumber: 2 }], fakeTimings)).toEqual(
      [ { name: 'fakestep1', orderItem: 'fakeitem1', duration: 5, orderItemNumber: 1, startTime: 0 },
        { name: 'fakestep2', orderItem: 'fakeitem1', duration: 60, orderItemNumber: 1, startTime: 5 },
        { name: 'fakestep1', orderItem: 'fakeitem1', duration: 5, orderItemNumber: 2, startTime: 65 },
        { name: 'fakestep2', orderItem: 'fakeitem1', duration: 60, orderItemNumber: 2, startTime: 70 }
      ])
  })

  test('returns all necessary elements in steps', () => {

    expect(app.createSteps([{ orderItem: 'sandwich', orderItemNumber: 1 }, { orderItem: 'sandwich', orderItemNumber: 2 },{ orderItem: 'sandwich', orderItemNumber: 3 }], timings)).toEqual(
      [ { name: 'make', orderItem: 'sandwich', duration: 60, orderItemNumber: 1, startTime: 0 },
        { name: 'serve', orderItem: 'sandwich', duration: 30, orderItemNumber: 1, startTime: 60},
        { name: 'make', orderItem: 'sandwich', duration: 60, orderItemNumber: 2, startTime: 90},
        { name: 'serve', orderItem: 'sandwich', duration: 30, orderItemNumber: 2, startTime: 150},
        { name: 'make', orderItem: 'sandwich', duration: 60, orderItemNumber: 3, startTime: 180},
        { name: 'serve', orderItem: 'sandwich', duration: 30, orderItemNumber: 3, startTime: 240}
      ])
  })

  test('schedule#flattenedSteps adds startTime by adding up duration of all previous steps', () => {
      

      let flattenedSteps = [ { duration: 5 }, { duration: 10 }, { duration: 20 } ]

      expect(app.addStartTimeToSteps(flattenedSteps)[0].startTime).toEqual(0)
      expect(app.addStartTimeToSteps(flattenedSteps)[1].startTime).toEqual(5)
  })
