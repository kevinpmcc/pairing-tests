
const fs = require('fs')
const partiesAbbrievs = {
    'L': 'Labour Party',
    'C': 'Conservative Party',
    'UKIP': 'UKIP',
    'LD': 'Liberal Democrats',
    'G': 'Green Party',
    'Ind': 'Independent'
}
const types = {
    constituencyName: /^[a-zA-Z& ]+$/ 
}

class Validator { 

    constructor(line, errorFilePath='./errorLogs.txt') {
        this.line = line
        this.errorFilePath = errorFilePath
    }

    writeError(errorMsg) {
        fs.appendFileSync(this.errorFilePath, errorMsg + ' from line beginning with ' + this.line[0] + '\n', { flag: 'a+' })
    }

    validate() {
        let constituencyName = this.line[0]
        if (!this.validateConstituencyName(constituencyName)) return false
        if (!this.validateNumberOfVotes(this.line[1])) return false
        if (!this.validatePartyAbbriev(this.line[2])) return false
        return true
    }

    validateNumberOfVotes(num) {
        if (!parseInt(num)) {
            this.writeError('expected number of votes and got ' + num)
            return false
        }
        return true
    }

    validatePartyAbbriev(partyAbbriev) {
        if (!partiesAbbrievs[(partyAbbriev.trim())]) {
            this.writeError('expect party recognised party abbrieviation and got ' + partyAbbriev)
            return false
        }
        return true
    }
    validateConstituencyName(name) {
        if (partiesAbbrievs[name.trim()]) {
            this.writeError('expected constituency name and got party abbreviation \'' + name + '\'')
            return false
        }
        if (types.constituencyName.test(name)) {
            return true
        } else {
            this.writeError('Expected the first word of a line to be constituency name instead got \'' + name + '\'') 
            return false
        }
    }
}

module.exports = Validator
