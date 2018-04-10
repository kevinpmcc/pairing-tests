const fs = require('fs')
const Validator = require('./validateResults')
test('validate returns false if first element of results is not az string', () => {
    let v = new Validator(['30000', 'L', 'Cardiff West'])

    expect(v.validate()).toBe(false)
})

test('validate returns true if first element of results is az string', () => {
    let v = new Validator(['Cardiff West', '30000', 'L'])

    expect(v.validate()).toBe(true)
})

test('validates true if first element of results contains &', () => {
    let v = new Validator(['Highbury & Islington', '30000', 'L'])

    expect(v.validate()).toBe(true)
})

test('validates false if first element of results is a party abbriev', () => {
    let v = new Validator(['L'])

    expect(v.validate()).toBe(false)
})

test('validates false if party abbriev is not known', () => {
    let v = new Validator(['Highbury & Islington', '200', '  J'])

    expect(v.validate()).toBe(false)
})

test('validates false if second element of array is not valid', () => {
    let v = new Validator(['Highbury & Islington', 'L', 'L'])

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