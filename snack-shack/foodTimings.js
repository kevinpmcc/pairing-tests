const timings = {
  orderItems: [
    {
      name: 'sandwich',
      steps: [
        { name: 'make', duration: 60 },
        { name: 'serve', duration: 30 }
      ]   
    },
    {
      name: 'jacket potato',
      steps: [
        { name: 'put in microwave', duration: 1},
        { name: 'microwave', duration: 180 },
        { name: 'take out of microwave', duration: 30 },
        { name: 'top', duration: 30 },
        { serve: 'serve', duration: 30 }
      ]
    }
  ]
}

module.exports = timings