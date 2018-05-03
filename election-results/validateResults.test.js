const fs = require('fs')
const Validator = require('./validateResults')
test.only('validate returns false if first element of results is not az string', () => {
    let v = new Validator({
        'Cardiff West':
            {
                'Labour Party': '10.00', 'UKIP': '10.00',
                'Liberal Democrats': '70.00', 'Conservative Party': '10.00'
            }, 'Islington South & Finsbury': { 'Independent': '20.00', 'Green Party': '80.00' }
    })

    expect(v.validate()).toEqual({
        'Cardiff West':
            {
                'Labour Party': '10.00', 'UKIP': '10.00',
                'Liberal Democrats': '70.00', 'Conservative Party': '10.00'
            }, 'Islington South & Finsbury': { 'Independent': '20.00', 'Green Party': '80.00' }
    })
})

test.only('validate returns only valid data if first element of results is not az string', () => {
    let v = new Validator({
        '2345':
            {
                'Labour Party': '10.00', 'UKIP': '10.00',
                'Liberal Democrats': '70.00', 'Conservative Party': '10.00'
            }, 'Islington South & Finsbury': { 'Independent': '20.00', 'Green Party': '80.00' }
    })

    expect(v.validate()).toEqual({
         'Islington South & Finsbury': { 'Independent': '20.00', 'Green Party': '80.00' }
    })
})

test.only('validate returns only valid data if first element of results is a party abbriev', () => {
    let v = new Validator({
        'L':
            {
                'Labour Party': '10.00', 'UKIP': '10.00',
                'Liberal Democrats': '70.00', 'Conservative Party': '10.00'
            }, 'Islington South & Finsbury': { 'Independent': '20.00', 'Green Party': '80.00' }
    })

    expect(v.validate()).toEqual({
         'Islington South & Finsbury': { 'Independent': '20.00', 'Green Party': '80.00' }
    })
})

test.only('validate returns only valid data if a party abbriev is unknown', () => {
    let v = new Validator({
        'Cardiff West':
            {
                'Labour Party': '10.00', 'UKIP': '10.00',
                'Liberal Democrats': '70.00', 'Conservative Party': '10.00'
            }, 'Islington South & Finsbury': { 'Not A Party': '20.00', 'Green Party': '80.00' }
    })

    expect(v.validate()).toEqual({
         'Islington South & Finsbury': { 'Independent': '20.00', 'Green Party': '80.00' }
    })
})


test('validates false if party abbriev is not known', () => {
    let v = new Validator(['Highbury & Islington', '200', '  J'])

    expect(v.validate()).toBe(false)
})

test('validates false if second element of array is not valid', () => {
    let v = new Validator(['Highbury & Islington', 'L', 'L'])

    expect(v.validate()).toBe(false)
})

test('validates false if party abbriev is not known in second party', () => {
    let v = new Validator(['Highbury & Islington', '200', '  L', '200', 'K'])

    expect(v.validate()).toBe(false)
})
test('validates false if party abbriev is not known in fifth party', () => {
    let v = new Validator(['Highbury & Islington', '200', '  L', '200', 'C', '0', 'UKIP', '50', 'LD', '600', 'K'])

    expect(v.validate()).toBe(false)
})
test('logs errorMessage explaining issue when given a number', (done) => {
    const testErrorFile = './testErrorFile.txt'
    if (fs.existsSync(testErrorFile)) fs.unlinkSync(testErrorFile)

    let v = new Validator(['C'], testErrorFile)
    v.validate()

    setTimeout(() => {
        const text = fs.readFileSync(testErrorFile, 'utf8').split('\n')
        expect(text[text.length - 2]).toEqual('expected constituency name and got party abbreviation \'C\' from line beginning with C')
        done()
    }, 5)
})