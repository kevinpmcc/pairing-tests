const createOrder = require('./order')

const sandwichDurationStep1 = 10
const sandwichDurationStep2 = 45
const potatoDurationStep1 = 5
const potatoDurationStep2 = 60
const potatoDurationStep3 = 30
const potatoDurationStep4 = 20
const potatoDurationStep5 = 4

const timings = {
    orderItems: [
      {
        name: 'sandwich',
        steps: [
          { name: 'make', duration:  sandwichDurationStep1},
          { name: 'serve', duration: sandwichDurationStep2 }
        ]   
      },
      {
        name: 'jacket potato',
        steps: [
          { name: 'put in microwave', duration: potatoDurationStep1},
          { name: 'microwave', duration: potatoDurationStep2 },
          { name: 'take out of microwave', duration: potatoDurationStep3 },
          { name: 'top', duration: potatoDurationStep4 },
          { serve: 'serve', duration: potatoDurationStep5 }
        ]
      }
    ]
  }

test.only('returns the order with correct orderItem and orderItemNumber', () => {
  expect(createOrder({ orderItem: 'sandwich' }, 1, timings).orderItem).toBe('sandwich')
  expect(createOrder({ orderItem: 'sandwich' }, 1, timings).orderItemNumber).toBe(1)
})

test.only('returns the total time of all steps', () => {
  let totalSandwichTime = sandwichDurationStep1 + sandwichDurationStep2
  expect(createOrder({ orderItem: 'sandwich' }, 1, timings).totalTime).toBe(totalSandwichTime)
})

test.only('returns the total time of all steps', () => {
  let totalPotatoTime = potatoDurationStep1 + potatoDurationStep2 + potatoDurationStep3 + potatoDurationStep4 + potatoDurationStep5
  expect(createOrder({ orderItem: 'jacket potato'}, 1, timings).totalTime).toBe(totalPotatoTime)
})

test.only