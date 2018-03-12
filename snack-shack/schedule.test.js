const app = require('./schedule.js')


test('schedule#getSchedule returns the correct schedule when one order is place', () => {
  let schedule = new app.Schedule()
  let orders = [{ foodType: 'sandwich' }]

  expect(schedule.getSchedule(orders)).toBe('1. 0:00 make sandwich 1\n2. 0:60 serve sandwich 1\n3. 1:30 take a break!')
})

test('schedule#getSchedule returns the correct schedule when two orders are placed', () => {
let schedule = new app.Schedule()
let orders = [{ foodType: 'sandwich' }, { foodType: 'sandwich' }]

expect(schedule.getSchedule(orders)).toBe('1. 0:00 make sandwich 1\n2. 0:60 serve sandwich 1\n3. 1:30 make sandwich 2\n4. 2:30 serve sandwich 2\n5. 3:00 take a break!')
})

test('schedule#getSchedule returns the correct schedule when four orders are placed', () => {
  let schedule = new app.Schedule()
  let orders = [{ foodType: 'sandwich' }, { foodType: 'sandwich' }, { foodType: 'sandwich' }, { foodType: 'sandwich' }]
  
  expect(schedule.getSchedule(orders)).toBe('1. 0:00 make sandwich 1\n2. 0:60 serve sandwich 1\n3. 1:30 make sandwich 2\n4. 2:30 serve sandwich 2\n5. 3:00 make sandwich 3\n6. 4:00 serve sandwich 3\n7. 4:30 make sandwich 4\n8. 5:30 serve sandwich 4\n9. 6:00 take a break!')
  })

  test('schedule#createSteps returns the correct number of steps', () => {
    let schedule = new app.Schedule()

    expect(schedule.createSteps([{ foodType: 'sandwich' }]).length).toEqual(2)
  })

  test('schedule#createSteps returns the correct number of steps', () => {
    let schedule = new app.Schedule()

    expect(schedule.createSteps([{ foodType: 'sandwich' }, { foodType: 'sandwich' }]).length).toEqual(4)
  })

  test('returns all necessary elements in steps', () => {
    let schedule = new app.Schedule()

    expect(schedule.createSteps([{ foodType: 'sandwich' }])).toEqual(
      [ { name: 'make', foodType: 'sandwich', duration: 60, orderItemNumber: 1 },
        { name: 'serve', foodType: 'sandwich', duration: 30, orderItemNumber: 1 }
      ])
  })

  test('returns all necessary elements in steps', () => {
    let schedule = new app.Schedule()

    expect(schedule.createSteps([{ foodType: 'sandwich' }, { foodType: 'sandwich'}])).toEqual(
      [ { name: 'make', foodType: 'sandwich', duration: 60, orderItemNumber: 1 },
        { name: 'serve', foodType: 'sandwich', duration: 30, orderItemNumber: 1 },
        { name: 'make', foodType: 'sandwich', duration: 60, orderItemNumber: 2 },
        { name: 'serve', foodType: 'sandwich', duration: 30, orderItemNumber: 2 }
      ])
  })

  test('returns all necessary elements in steps', () => {
    let schedule = new app.Schedule()

    expect(schedule.createSteps([{ foodType: 'sandwich' }, { foodType: 'sandwich' },{ foodType: 'sandwich' }])).toEqual(
      [ { name: 'make', foodType: 'sandwich', duration: 60, orderItemNumber: 1 },
        { name: 'serve', foodType: 'sandwich', duration: 30, orderItemNumber: 1 },
        { name: 'make', foodType: 'sandwich', duration: 60, orderItemNumber: 2 },
        { name: 'serve', foodType: 'sandwich', duration: 30, orderItemNumber: 2 },
        { name: 'make', foodType: 'sandwich', duration: 60, orderItemNumber: 3 },
        { name: 'serve', foodType: 'sandwich', duration: 30, orderItemNumber: 3 }
      ])
  })
