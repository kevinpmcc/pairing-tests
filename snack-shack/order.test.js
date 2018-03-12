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

test('returns the orderItem', () => {
  expect(createOrder({ orderItem: 'sandwich' }, timings).orderItem).toBe('sandwich')
})

test('returns the total time of all steps', () => {
  let totalSandwichTime = sandwichDurationStep1 + sandwichDurationStep2
  expect(createOrder({ orderItem: 'sandwich' }, timings).totalTime).toBe(totalSandwichTime)
})

test('returns the total time of all steps', () => {
  let totalPotatoTime = potatoDurationStep1 + potatoDurationStep2 + potatoDurationStep3 + potatoDurationStep4 + potatoDurationStep5
  expect(createOrder({ orderItem: 'jacket potato'}, timings).totalTime).toBe(totalPotatoTime)
})