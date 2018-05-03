
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

    constructor(data, errorFilePath='./errorLogs.txt') {
        this.data = data
        this.errorFilePath = errorFilePath
    }

    writeError(errorMsg) {
        fs.appendFileSync(this.errorFilePath, errorMsg, { flag: 'a+' })
    }

    validate() {
        Object.keys(this.data).map((key) => {
            let constituencyName = key
            if (!this.validateConstituencyName(constituencyName)) delete this.data[key]
            return this.data
            Object.keys(this.data[key]).map((party) => {
                if ((!this.validatePartyAbbriev(party) || (!this.validateNumberOfVotes(this.data[key][party])))) {
                    delete this.data[key]
                }
            })
        })
        return this.data
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
