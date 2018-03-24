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

test('snackHack#placeOrder will not accept order if wait time if over max wait time', () => {
    let shack = new app.SnackShack(300)

    shack.placeOrder()
    shack.placeOrder()
    shack.placeOrder()

    expect(shack.placeOrder()).toEqual("sorry, we cannot take your order as it would take too long")
    expect(shack.orders.length).toBe(3)
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

test('snackShack#maxWaitTime will return maxWaitTime passed in', () => {
    let maxWaitTime = 300
    let shack = new app.SnackShack(maxWaitTime)

    expect(shack.maxWaitTime).toEqual(maxWaitTime)
})

test('snackShack#maxWaitTime will return undefined if nothing passed in', () => {
    let shack = new app.SnackShack()

    expect(shack.maxWaitTime).toEqual(undefined)
})

test('snackShack#inventory will store number of items in stock', () => {
    let shack = new app.SnackShack(undefined, { sandwich: 45 })

    expect(shack.inventory).toEqual({ sandwich: 45 })
})

test('snackShack#notEnoughInventory will return false if inventory is undefined', () => {
    let shack = new app.SnackShack()

    expect(shack.notEnoughInventory('sandwich')).toEqual(false)
})


test('snackShack#notEnoughInventory will return true if inventory is 0', () => {
    let shack = new app.SnackShack(undefined, { sandwich: 0 })

    expect(shack.notEnoughInventory('sandwich')).toEqual(true)
})