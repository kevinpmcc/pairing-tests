const partiesAbbrievs = {
    'L': 'Labour Party',
    'C': 'Conservative Party',
    'UKIP': 'UKIP',
    'LD': 'Liberal Democrats',
    'G': 'Green Party',
    'Ind': 'Independent'
}

function formatResults(electionResults) {
    let returnString = ''
    resultsLines = electionResults.split('\n')
    for (resultsLine of resultsLines) {
        if (resultsLine.length > 0) { 
            returnString += formatLine(resultsLine)
        }
    }
    return returnString.substr(0, returnString.length -1)
}

function formatLine(electionResults) {
    resultsArray = electionResults.split(',')
    let constituencyName = resultsArray.shift()
    let results = partiesAndPercentages(resultsArray)
    return constituencyName + '\n' + partiesAndPercentages(resultsArray)
}

function partiesAndPercentages(rawResults) {
    let results = cleanUpData(rawResults)
    let totalVotes = results.reduce((a,b) => ({ votes: a.votes + b.votes })).votes
    let string = ''
    for (result of results) { 
        string += createLine(result, totalVotes)  + '%\n' 
    }

    return string
}

function cleanUpData(rawResults) {
    let results = []
    for (let i = 0; i < rawResults.length - 1; i += 2) {
        let partyResults = {} 
        partyResults['party'] = getPartyName(rawResults[i + 1]) 
        partyResults['votes'] = parseInt(rawResults[i])
        results.push(partyResults)
    }
    return results
}

function getPartyName(abbriev) {
    return partiesAbbrievs[removeWhiteSpaceAtStart(abbriev)]
}
function removeWhiteSpaceAtStart(str) {
    return str.substr(1, str.length)
}

function createLine(partyResults, totalVotes) {
    return partyResults.party + ': ' + (partyResults.votes / totalVotes * 100).toFixed(2)
}


module.exports = { formatResults: formatResults,
                   removeWhiteSpaceAtStart: removeWhiteSpaceAtStart,
                   getPartyName: getPartyName,
                   partiesAndPercentages: partiesAndPercentages
                }