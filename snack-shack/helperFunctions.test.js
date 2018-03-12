const app = require('./helperFunctions.js')

test('#formatSecondsToMinutes turns seconds into minutes and seconds', () => {
  expect(app.formatSecondsToMinutes(0)).toBe('0:00')
})

test('#formatSecondsToMinutes turns seconds into minutes and seconds', () => {
  expect(app.formatSecondsToMinutes(90)).toBe('1:30')
})

test('#formatSecondsToMinutes return 0:60 when given 60', () => {
  expect(app.formatSecondsToMinutes(60)).toBe('0:60')
})