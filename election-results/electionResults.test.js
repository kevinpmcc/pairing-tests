app = require('./handleIncomingResults')
const formatResults = require('./handleIncomingResults').formatResults
const removeWhiteSpaceAtStart = require('./handleIncomingResults').removeWhiteSpaceAtStart
const getPartyName = require('./handleIncomingResults').getPartyName
const partiesAndPercentages = require('./handleIncomingResults').partiesAndPercentages
const mergeObjects = require('./handleIncomingResults').mergeObjects
const combineData = require('./handleIncomingResults').combineData
const addPercentagesIfValid= require('./handleIncomingResults').addPercentagesIfValid
const createAndOutputFormattedResults = require('./handleIncomingResults').createAndOutputFormattedResults
const createReturnString = require('./handleIncomingResults').createReturnString


test('createAndOutputFormattedResults will return an object with all combined data', () => {
    let original = 'Cardiff West, 1, L, 1, UKIP, 7, LD\nIslington South & Finsbury, 2, Ind, 6, G'
    let override = 'Cardiff West, 1, C\nIslington South & Finsbury, 8, G'

    let actual = createAndOutputFormattedResults(original, override)

    expect(actual).toEqual('Cardiff West\nLabour Party: 10.00%\nUKIP: 10.00%\nLiberal Democrats: 70.00%\nConservative Party: 10.00%\nIslington South & Finsbury\nIndependent: 20.00%\nGreen Party: 80.00%\n')
})

test('createAndOutputFormattedResults will return an object with all combined valid data leaving out invalid data', () => {
    let original = 'Cardiff West, L, 1, UKIP, 7, LD\nIslington South & Finsbury, 2, Ind, 6, G'
    let override = 'Cardiff West, 1, C\nIslington South & Finsbury, 8, G'

    let actual = createAndOutputFormattedResults(original, override)

    expect(actual).toEqual('Islington South & Finsbury\nIndependent: 20.00%\nGreen Party: 80.00%\n')
})

test('combineData will return an object with all combined data', () => {
    let original = 'Cardiff West, 100, C, 100, L, 100, UKIP, 700, LD\nIslington South & Finsbury, 20, Ind, 80, G'
    let override = 'Cardiff West, 120, C\nIslington South & Finsbury, 90, G'

    let actual = combineData(original, override)
    expect(actual).toEqual(
        {
            'Cardiff West':
                {
                    'Conservative Party': 120,
                    'Labour Party': 100,
                    'UKIP': 100,
                    'Liberal Democrats': 700
                },
            'Islington South & Finsbury':
                {
                    'Independent': 20,
                    'Green Party': 90
                }
        })
})

test('addPercentagesIfValidto change votes to percentages', () => {
    let original = {
        'Cardiff West':
            {
                'Conservative Party': 1,
                'Labour Party': 1,
                'UKIP': 1,
                'Liberal Democrats': 7
            },
        'Islington South & Finsbury':
            {
                'Independent': 10,
                'Green Party': 40
            }
    }

    expected = {
        'Cardiff West':
            {
                'Conservative Party': '10.00',
                'Labour Party': '10.00',
                'UKIP': '10.00',
                'Liberal Democrats': '70.00'
            },
        'Islington South & Finsbury':
            {
                'Independent': '20.00',
                'Green Party': '80.00'
            }
    }

    expect(addPercentagesIfValid(original)).toEqual(expected)
})

test('createReturnString takes in object and returns as formatted string', () => {
    let data = {
        'Cardiff West':
            {
                'Labour Party': '10.00', 'UKIP': '10.00',
                'Liberal Democrats': '70.00', 'Conservative Party': '10.00'
            }, 'Islington South & Finsbury': { 'Independent': '20.00', 'Green Party': '80.00' }
    }

    let expected = 'Cardiff West\nLabour Party: 10.00%\nUKIP: 10.00%\nLiberal Democrats: 70.00%\nConservative Party: 10.00%\nIslington South & Finsbury\nIndependent: 20.00%\nGreen Party: 80.00%\n'

    expect(createReturnString(data)).toEqual(expected)

})