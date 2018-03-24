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

test('snackShack#howManyOfOrderItemOrdered returns the number of previous orders of an order item', () => {
    let shack = new app.SnackShack()

    shack.placeOrder('sandwich')
    shack.placeOrder('sandwich')

    expect(shack.howManyOfItemOrdered('sandwich')).toBe(2)
})

test('snackShack#howManyOfOrderItemOrdered returns the number of previous orders of an order item', () => {
    let shack = new app.SnackShack()

    shack.placeOrder('jacket potato')
    shack.placeOrder('jacket potato')
    shack.placeOrder('jacket potato')
    shack.placeOrder('sandwich')
    shack.placeOrder('sandwich')
    shack.placeOrder('jacket potato')
    shack.placeOrder('jacket potato')
    shack.placeOrder('jacket potato')


    expect(shack.howManyOfItemOrdered('jacket potato')).toBe(6)
})
