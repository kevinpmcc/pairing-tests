const app = require('./snackShack')

test('snackShack starts with 0 orders', () => {
    let shack = new app.SnackShack()

    expect(shack.orders.length).toBe(0)
})

test('snackShack#placeOrder increases number of orders by 1', () => {
    let shack = new app.SnackShack()

    shack.placeOrder()

    expect(shack.orders.length).toBe(1)
})

test('snackShack#placeOrder increases number of orders each time', () => {
    let shack = new app.SnackShack()
    
    shack.placeOrder()
    shack.placeOrder()
    shack.placeOrder()
    shack.placeOrder()

    expect(shack.orders.length).toBe(4)
})
