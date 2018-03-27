const timings = {
  orderItems: [
    {
      name: 'sandwich',
      steps: [
        { name: 'make', duration: 60, async: false },
        { name: 'serve', duration: 30, async: false }
      ]   
    },
    {
      name: 'jacket potato',
      steps: [
        { name: 'put in microwave', duration: 1, async: false  },
        { name: 'microwave', duration: 180, async: true },
        { name: 'take out of microwave', duration: 30 },
        { name: 'top', duration: 30, async: false },
        { name: 'serve', duration: 30, async: false }
      ]
    }
  ]
}

module.exports = timings