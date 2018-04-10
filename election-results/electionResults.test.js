app = require('./handleIncomingResults')
const formatResults = require('./handleIncomingResults').formatResults
const removeWhiteSpaceAtStart = require('./handleIncomingResults').removeWhiteSpaceAtStart
const getPartyName = require('./handleIncomingResults').getPartyName
const partiesAndPercentages = require('./handleIncomingResults').partiesAndPercentages

test('formatResults will return the name of the constituency', () => {
    let actual = formatResults('Cardiff West, 11014, C, 17803, L, 4923, UKIP, 2069, LD\n')

    expect(actual).toContain('Cardiff West')
})
test('formatResults will return the name of the constituency', () => {
    let actual = formatResults('Islington South & Finsbury, 22547, L, 9389, C, 4829, LD, 3375, UKIP, 3371, G, 309, Ind\n')

    expect(actual).toContain('Islington South & Finsbury')
})

test('formatResults will return the name of the party', () => {
    let actual = formatResults('Cardiff West, 100, C, 100, L, 100, UKIP, 700, LD\nIslington South & Finsbury, 20, Ind, 80, G')

    expect(actual).toBe('Cardiff West\nConservative Party: 10.00%\nLabour Party: 10.00%\nUKIP: 10.00%\nLiberal Democrats: 70.00%\nIslington South & Finsbury\nIndependent: 20.00%\nGreen Party: 80.00%')
})

test('getPartyName takes a letter with whitespace and returns related party', () => {
    expect(getPartyName(' L')).toEqual('Labour Party')
    expect(getPartyName(' UKIP')).toEqual('UKIP')
})

test('partiesAndPercentages takes an array of numbers and abbreviations and returns party names with percentages', () => {
    let rawResults = [ '100', ' C', '300', ' L']
    expect(partiesAndPercentages(rawResults)).toBe('Conservative Party: 25.00%\nLabour Party: 75.00%\n')
})

test('partiesAndPercentages takes an array of numbers and abbreviations and returns party names with percentages', () => {
    let rawResults = [ '200', ' C', '800', ' L']
    expect(partiesAndPercentages(rawResults)).toBe('Conservative Party: 20.00%\nLabour Party: 80.00%\n')
})


