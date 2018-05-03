const fs = require('fs')
const Validator = require('./validateResults')
const deepMerge = require('deepmerge')

const partiesAbbrievs = {
    'L': 'Labour Party',
    'C': 'Conservative Party',
    'UKIP': 'UKIP',
    'LD': 'Liberal Democrats',
    'G': 'Green Party',
    'Ind': 'Independent'
}

function createAndOutputFormattedResults(original, override) {
    return createReturnString(addPercentagesIfValid(combineData(original, override)))
}

function combineData(original, override) {
    return deepMerge(convertOriginalTextToObject(original), convertOriginalTextToObject(override))
}

function convertOriginalTextToObject(electionResults) {
    resultsLines = electionResults.split('\n')
    let resultsLinesObj = {}
    resultsLines.map((resultsLine) => {
        if (resultsLine.length > 0) { 
            Object.assign(resultsLinesObj, formatLine(resultsLine))
        }
    })
    return resultsLinesObj
}

function formatLine(electionResults) {
    resultsArray = electionResults.split(',')
    return { [resultsArray.shift()]: cleanUpPartiesAndVotes(resultsArray )}   
}

function cleanUpPartiesAndVotes(rawResults) {
    let newResults = {}
    rawResults.map((item, index) => { 
        if (index % 2 !== 0) return
        newResults[partiesAbbrievs[(rawResults[index + 1]).trim()]] = parseInt(item)
    })
    return newResults
}

function addPercentagesIfValid(data) {
    let validData = new Validator(data).validate()
    Object.keys(validData).map((key) => {
        var totalVotes = Object.values(validData[key]).reduce((a,b) => a + b)
        Object.keys(validData[key]).map((prop) => {
            validData[key][prop] = ((validData[key][prop] / totalVotes) * 100).toFixed(2)            
        })
    })
    return data
}

function createReturnString(data) {
    let returnString = ''
    Object.keys(data).map((key) => {
        returnString += key + '\n' + 
                    Object.keys(data[key]).map((prop) => {
                        return `${prop}: ${data[key][prop]}%` 
                    }).join('\n') + 
                    '\n'
    })
    return returnString
}















module.exports = { 
                   combineData,
                   addPercentagesIfValid,
                   createAndOutputFormattedResults,
                   createReturnString
                }
