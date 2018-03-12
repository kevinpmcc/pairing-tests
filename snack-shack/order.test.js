const createOrder = require('./order')

test('returns the foodType', () => {
  expect(createOrder({ foodType: 'sandwich' }).foodType).toBe('sandwich')
})

test('returns the total time of all steps', () => {
  expect(createOrder({ foodType: 'sandwich' }).totalTime).toBe(90)
})

test('returns the total time of all steps', () => {
  expect(createOrder({ foodType: 'jacket potato'}).totalTime).toBe(271)
})