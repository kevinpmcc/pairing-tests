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


test.only('schedule#getSchedule returns the correct schedule when one sandwich order has been placed', () => {
  let schedule = new app.Schedule(fakeTimings)
  let orders = [{ orderItem: 'fakeitem1' }]

  expect(schedule.getSchedule(orders)).toBe('1. 0:00 fakestep1 fakeitem1 1\n2. 0:05 fakestep2 fakeitem1 1\n3. 1:05 take a break!')
})

test.only('schedule#getSchedule returns the correct schedule when two sandwich orders have been placed', () => {
let schedule = new app.Schedule(fakeTimings)
let orders = [{ orderItem: 'fakeitem1' }, { orderItem: 'fakeitem1' }]

expect(schedule.getSchedule(orders)).toBe('1. 0:00 fakestep1 fakeitem1 1\n2. 0:05 fakestep2 fakeitem1 1\n3. 1:05 fakestep1 fakeitem1 2\n4. 1:10 fakestep2 fakeitem1 2\n5. 2:10 take a break!')
})

test.only('schedule#getSchedule returns the correct schedule when four sandwich orders have been placed', () => {
  let schedule = new app.Schedule(fakeTimings)
  let orders = [{ orderItem: 'fakeitem1' }, { orderItem: 'fakeitem1' }, { orderItem: 'fakeitem1' }, { orderItem: 'fakeitem1' }]
  
  expect(schedule.getSchedule(orders)).toBe('1. 0:00 fakestep1 fakeitem1 1\n2. 0:05 fakestep2 fakeitem1 1\n3. 1:05 fakestep1 fakeitem1 2\n4. 1:10 fakestep2 fakeitem1 2\n5. 2:10 fakestep1 fakeitem1 3\n6. 2:15 fakestep2 fakeitem1 3\n7. 3:15 fakestep1 fakeitem1 4\n8. 3:20 fakestep2 fakeitem1 4\n9. 4:20 take a break!')
  })

  test.only('schedule#createSteps returns the correct number of steps for an item', () => {
    let schedule = new app.Schedule(fakeTimings)

    expect(schedule.createSteps([{ orderItem: 'fakeitem1' }]).length).toEqual(2)
  })

  test.only('schedule#createSteps returns the correct number of steps', () => {
    let schedule = new app.Schedule(fakeTimings)

    expect(schedule.createSteps([{ orderItem: 'fakeitem1' }, { orderItem: 'fakeitem1' }]).length).toEqual(4)
  })

  test.only('schedule#createSteps returns the correct number of steps', () => {
    let schedule = new app.Schedule(fakeTimings)

    expect(schedule.createSteps([{ orderItem: 'fakeitem1' }, { orderItem: 'fakeitem2' }]).length).toEqual(6)
  })

  test('returns all necessary elements in steps', () => {
    let schedule = new app.Schedule(fakeTimings)

    expect(schedule.createSteps([{ orderItem: 'fakeitem1' }])).toEqual(
      [ { name: 'fakestep1', orderItem: 'fakeitem1', duration: 5, orderItemNumber: 1 },
        { name: 'fakestep2', orderItem: 'fakeitem1', duration: 60, orderItemNumber: 1 }
      ])
  })

  test('returns all necessary elements in steps', () => {
    let schedule = new app.Schedule()

    expect(schedule.createSteps([{ orderItem: 'fakeitem1' }, { orderItem: 'fakeitem1'}])).toEqual(
      [ { name: 'make', orderItem: 'sandwich', duration: 60, orderItemNumber: 1 },
        { name: 'serve', orderItem: 'sandwich', duration: 30, orderItemNumber: 1 },
        { name: 'make', orderItem: 'sandwich', duration: 60, orderItemNumber: 2 },
        { name: 'serve', orderItem: 'sandwich', duration: 30, orderItemNumber: 2 }
      ])
  })

  test('returns all necessary elements in steps', () => {
    let schedule = new app.Schedule()

    expect(schedule.createSteps([{ orderItem: 'sandwich' }, { orderItem: 'sandwich' },{ orderItem: 'sandwich' }])).toEqual(
      [ { name: 'make', orderItem: 'sandwich', duration: 60, orderItemNumber: 1 },
        { name: 'serve', orderItem: 'sandwich', duration: 30, orderItemNumber: 1 },
        { name: 'make', orderItem: 'sandwich', duration: 60, orderItemNumber: 2 },
        { name: 'serve', orderItem: 'sandwich', duration: 30, orderItemNumber: 2 },
        { name: 'make', orderItem: 'sandwich', duration: 60, orderItemNumber: 3 },
        { name: 'serve', orderItem: 'sandwich', duration: 30, orderItemNumber: 3 }
      ])
  })

  test.only('schedule#flattenedSteps adds startTime by adding up duration of all previous steps', () => {
      

      let flattenedSteps = [ { duration: 5 }, { duration: 10 }, { duration: 20 } ]

      expect(app.Schedule.addStartTimeToSteps(flattenedSteps)[0].startTime).toEqual(0)
      expect(app.Schedule.addStartTimeToSteps(flattenedSteps)[1].startTime).toEqual(5)
  })
